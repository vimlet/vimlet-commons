//@header Provide methods for listing, copying, deletion and moving files. Glob implemented.
var path = require("path");
var glob = require("glob");
var fs = require("fs-extra");

/*
@function getFiles {[object]} [Get included files, returns an object wich contains relative path and root folder]
@param dir {[string]} [Array of patterns to search or single pattern]
@param exclude {[string]} [Patterns to exclude]
 */
exports.getFiles = function(dir, exclude) {
  var result = [];
  if (!Array.isArray(dir)) {
    var fileObj = {
      root: getRootFromPattern(dir),
      files: []
    };
    fileObj.files = getFileList(dir, exclude);
    result.push(fileObj);
  } else {
    dir.forEach(function(d) {
      var fileObj = {
        root: getRootFromPattern(d),
        files: []
      };
      fileObj.files = getFileList(d, exclude);
      result.push(fileObj);
    });
  }
  return result;
};

/*
@function (private) getFileList [Get files recursively from directory] {[string]}
@param dir {string} [Directory to search]
@param exclude {[string]} [[string] of patterns to exclude from search]
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
    clean.push(path.relative(getRootFromPattern(dir), res));
  });
  return clean;
}

/*
@function (private) getRootFromPattern {string} [Get root from a pattern.] @param pattern {string}
 */
function getRootFromPattern(pattern) {
  if (!exports.isDirectory(pattern)) {
    return pattern.substring(0, pattern.indexOf("*"));
  } else {
    return pattern;
  }
}

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
