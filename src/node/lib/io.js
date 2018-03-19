//@header Provide methods for listing, copying, deletion and moving files. Glob implemented.
var path = require("path");
var glob = require("glob");
var fs = require("fs-extra");

/*
@function getFiles {object[]} [Get included files, returns an object wich contains relative path and root folder]
@param dir {string[]} [Array of patterns to search or single pattern]
@param exclude {string[]} [Patterns to exclude]
@param ignoreExtension {boolean} [Get all files no mather extension in patterns]
 */
exports.getFiles = function(dir, exclude, ignoreExtension) {
  if (ignoreExtension) {
    var noExtensionDir = [];
    if (Array.isArray(dir)) {
      dir.forEach(function(d) {
        noExtensionDir.push(exports.getRootFromPattern(d));
      });
      dir = noExtensionDir;
    }else{
      dir = exports.getRootFromPattern(dir);
    }
  }
  var result = [];
  if (!Array.isArray(dir)) {
    var fileObj = {
      root: exports.getRootFromPattern(dir),
      files: []
    };
    fileObj.files = getFileList(dir, exclude);
    result.push(fileObj);
  } else {
    dir.forEach(function(d) {
      var fileObj = {
        root: exports.getRootFromPattern(d),
        files: []
      };
      fileObj.files = getFileList(d, exclude);
      result.push(fileObj);
    });
  }
  return result;
};


/*
@function absoluteFiles {string[]} (public) [Return an array of absolute paths from a file index]
@param index {object} [Object with folders and relative paths]
 */
exports.absoluteFiles = function(index){
  var result = [];
  index.forEach(function(folder){
    folder.files.forEach(function(file){
      var currentF = path.join(folder.root, file);
      result.push(currentF);
    });
  });
  return result;
};

/*
@function (private) getFileList [Get files recursively from directory] {string[]}
@param dir {string} [Directory to search]
@param exclude {string[]} [string[] of patterns to exclude from search]
 */
function getFileList(dir, exclude) {
  //If it gets a fonder instead of a pattern, take all files in folder
  if(!glob.hasMagic(dir)){
    if(exports.isDirectory(dir)){
    dir = path.join(dir, "**/*.*");
    }
  }
  result = glob.sync(dir, {
    ignore: exclude
  });
  var clean = [];
  result.forEach(function(res) {
    clean.push(path.relative(exports.getRootFromPattern(dir), res));
  });
  return clean;
}

/*
@function (public) getRootFromPattern {string} [Get root from a pattern.] @param pattern {string}
 */
exports.getRootFromPattern = function(pattern) {
  if (!exports.isDirectory(pattern)) {
    if(glob.hasMagic(pattern)){
      return pattern.substring(0, pattern.indexOf("*"));
    }else{
      return path.dirname(pattern);
    }
  } else {
    return pattern;
  }
};

/*
@function isDirectory (public) [Check if a path is directory or file]
@param path {string}
 */
exports.isDirectory = function(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
};

/*
@function (public) deleteFolderRecursive [Delete a folder and its content] @param folderPath {string} [Folder path]
 */
exports.deleteFolderRecursive = function(folderPath) {
  folderPath = path.resolve(folderPath);
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(function(file, index) {
      var curPath = folderPath + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        exports.deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
};

/*
@function isInPattern {boolean} (public) [Check if a given path belongs to a pattern]
@param filePath {string} [Path to file]
@param pattern {string}
 */
exports.isInPattern = function(filePath, pattern){
  var result = false;
  filePath = path.resolve(filePath);
  var filesInPattern = exports.getFiles(pattern);
  filesInPattern.forEach(function(files){
    files.files.forEach(function(file){
      var currentFile = path.resolve(path.join(files.root, file));
      if(currentFile === filePath){
        result = true;
      }
    });
  });
  return result;
};

/*
@function writeToDisk (private)
@param output {string} [Output folder]
@param result {string} [Data to write]
@param callback
 */
exports.writeToDisk = function(output, result, callback) {
  fs.mkdirp(path.dirname("" + output), function(err) {
    if (err) {
      if (callback) {
        callback(err);
      }
      return console.log(err);
    }

    fs.writeFile("" + output, result, function(err) {
      if (err) {
        if (callback) {
          callback(err);
        }
        return console.log(err);
      } else {
        if (callback) {
          callback();
        }
      }
    });
  });
};


// @function getCommonBasePath (public) {string} [Return base path, what all have in common, for given paths] @param paths {string[]} [String with multiple path to compare]
exports.getCommonBasePath = function (paths) {
  var separator = path.sep;
  for(var pathI = 0; pathI < paths.length; pathI++){
      paths[pathI] = paths[pathI].replace(new RegExp("(\\/+|\\\\+)","g"), path.sep);
    } 
  while (paths.length > 1) {  // While there are more than 1 paths we keep mixing them
    for (var pathIndex = 1; pathIndex < paths.length; pathIndex = pathIndex + 1) {  // We start on index 1 in order to take always index and the previous one
      // We need the path to end with "/" to take as folders
      var s1 = paths[pathIndex - 1];
      if (s1[s1.length - 1] != separator) {
        s1 += separator;
      }
      var s2 = paths[pathIndex];
      if (s2[s2.length - 1] != separator) {
        s2 += separator;
      }      
      var result = "";
      // While we have folders in both paths keep comparing
      while (s1.indexOf(separator) >= 0 && s2.indexOf(separator) >= 0) {
        var s1NextDir = s1.substring(0, s1.indexOf(separator));  // First folder
        s1 = s1.substring(s1.indexOf(separator), s1.length); // Path without first folder        
        if (s1[0] === separator) {
          s1 = s1.substring(1, s1.length);
        }
        var s2NextDir = s2.substring(0, s2.indexOf(separator));  // First folder
        s2 = s2.substring(s2.indexOf(separator), s2.length); // Path without first folder
        if (s2[0] === separator) {
          s2 = s2.substring(1, s2.length);
        }

        if (s1NextDir === s2NextDir) {  // If both folders are equals, we add them
          result = path.join(result, s1NextDir);
        }
      }
      paths[pathIndex - 1] = result;  // Replace the first one at paths array
      paths.splice(pathIndex, 1); // Delete the last one because we mix them both
    }
  }
  return paths[0];
};