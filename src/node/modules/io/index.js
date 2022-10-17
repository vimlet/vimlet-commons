//@header Provide methods for listing, copying, deletion and moving files. Glob implemented.
var path = require("path");
var glob = require("glob");
var fs = require("fs-extra");
var rimraf = require("rimraf");
var cwd = process.cwd();


/*
@function getFiles {object[]} [Get included files, returns an object wich contains relative path and root folder]
@param dir {string[]} [Array of patterns to search or single pattern]
@param options [exclude: patterns to exclude from search, ignoreExtension: ignore file extensions, includeFolders: Boolean to include folders as paths, default false]
@param callback
 */
exports.getFiles = async function getFiles(dir, options, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.getFiles(dir, options, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }
  options = options || {};
  if (options.ignoreExtension) {
    var noExtensionDir = [];
    if (Array.isArray(dir)) {
      for (const d of dir) {
        var r = await exports.getRootFromPattern(d);
        noExtensionDir.push(r);
      }
      dir = noExtensionDir;
    } else {
      dir = await exports.getRootFromPattern(dir);
    }
  }
  var result = [];
  if (!Array.isArray(dir)) {
    var noArrayRoot = await exports.getRootFromPattern(dir);
    var fileObj = {
      root: noArrayRoot,
      files: []
    };
    fileObj.files = await getFileList(dir, options.exclude, options);
    result.push(fileObj);
  } else {
    for (const d of dir) {
      var noArrayRoot = await exports.getRootFromPattern(d);
      var fileObj = {
        root: noArrayRoot,
        files: []
      };
      fileObj.files = await getFileList(d, options.exclude, options);
      result.push(fileObj);
    }
  }
  callback(null, result);
};



/*
@function absoluteFiles {string[]} (public) [Return an array of absolute paths from a file index]
@param index {object} [Object with folders and relative paths]
 */
exports.absoluteFiles = function (index) {
  var result = [];
  index.forEach(function (folder) {
    folder.files.forEach(function (file) {
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
@param options [includeFolders: Boolean to include folders as paths, default false]
 */
async function getFileList(dir, exclude, options) {
  options = options || {};
  //If it gets a folder instead of a pattern, take all files in folder
  if (!glob.hasMagic(dir)) {
    if (await exports.isDirectory(dir)) {
      dir = path.join(dir, "**/*");
    }
  }
  if (exclude && !Array.isArray(exclude) && !glob.hasMagic(exclude)) {
    if (await exports.isDirectory(exclude)) {
      exclude = path.join(exclude, "**/*");
    }
  } else if (exclude) {
    for (var excludeIndex = 0; excludeIndex < exclude.length; excludeIndex++) {
      if (!glob.hasMagic(exclude[excludeIndex])) {
        exclude[excludeIndex] = path.join(exclude[excludeIndex], "**/*");
      }
    }
  }
  if (options.includeFolders) {
    result = await promisifyGlob(dir, {
      ignore: exclude
    });
  } else {
    result = await promisifyGlob(dir, {
      ignore: exclude,
      nodir: true
    });
  }
  var clean = [];
  for (const res of result) {
    var relative = await relativePath(dir, res);
    clean.push(relative);
  }
  return clean;
}

// @function promisifyGlob (private) [Return a promise from glob callback]
function promisifyGlob(dir, options) {
  return new Promise(function (resolve, reject) {
    glob(dir, options, function (err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

// @function relativePath (private) [Async return relative path joint to current path]
async function relativePath(dir, currentPath) {
  var currentRoot = await exports.getRootFromPattern(dir);
  return path.relative(currentRoot, currentPath);
}


/*
@function (public) getRootFromPattern {string} [Get root from a pattern] @param pattern {string} @param callback
 */
exports.getRootFromPattern = function getRootFromPattern(pattern, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.getRootFromPattern(pattern, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }
  exports.isDirectory(pattern, function (error, data) {
    if (!data) {
      if (glob.hasMagic(pattern)) {
        callback(null, pattern.substring(0, pattern.indexOf("*")));
      } else {
        callback(null, path.dirname(pattern));
      }
    } else {
      callback(null, pattern);
    }
  });
};


/*
@function isDirectory (private) [Check if a path is directory or file]
@param filePath {string}
@param callback
 */
exports.isDirectory = function isDirectory(filePath, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.isDirectory(filePath, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }

  try {
    fs.stat(filePath, function (err, data) {
      if (err) {
        callback(null, false);
      } else {
        callback(null, data.isDirectory());
      }
    });
  } catch (e) {
    callback(null, false);
  }
};



/*
@function getFileSize (private)
@description Returns the size of a file
@param {string} filePath [Path of the file]
@param callback
*/
exports.getFileSize = function getFileSize(filePath, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.getFileSize(filePath, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }

  try {
    exports.isDirectory(filePath, function (err, data) {
      if (data) {
        callback(null, -1);
      } else {
        fs.stat(filePath, function (err, data) {
          if (err) {
            callback(null, -1);
          } else {
            callback(null, data.size);
          }
        });
      }
    });
  } catch (error) {
    callback(null, -1);
  }
};



/*
@function (public) deleteFolderRecursive [Delete a folder and its content] @param folderPath {string} [Folder path] @param callback
 */
exports.deleteFolderRecursive = function deleteFolderRecursive(folderPath, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.deleteFolderRecursive(folderPath, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }

  callback = callback || function () {}; // rimraf doesn't accept null options nor null callback
  rimraf(folderPath, {}, callback);
};


/*
@function (public) deleteFolderRecursiveSync [Delete a folder and its content] @param folderPath {string} [Folder path]
 */
exports.deleteFolderRecursiveSync = function (folderPath) {
  rimraf.sync(folderPath);
};


/*
@function isInPattern {boolean} (public) [Check if a given path belongs to a pattern]
@param filePath {string} [Path to file]
@param pattern {string or string[]}
@param options {object} [exlude:files to exclude from search]
@param callback
 */
exports.isInPattern = async function isInPattern(filePath, pattern, options, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.isInPattern(filePath, pattern, options, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }

  if (!pattern) {
    callback(null, false);
  } else {
    options = options || {};
    // var result = false;
    var isDirectory = await exports.isDirectory(filePath);
    if (isDirectory) {
      options.includeFolders = true;
    }
    if (!Array.isArray(pattern)) {
      var inPattern = await isInPatternSingle(filePath, pattern, options);
      callback(null, inPattern);
    } else {
      var isIn = false;
      for (const patt of pattern) {
        var inPattern = await isInPatternSingle(filePath, patt, options);
        if (inPattern) {
          isIn = true;
        }
      }
      callback(null, isIn);
    }
  }
};


// @function isInPatternSingle (private) [Check if a file is in one an only one pattern. The difference between this function and isInPattern is that isInPattern accepts array also] @param filePath @param pattern @param options
function isInPatternSingle(filePath, pattern, options) {
  return new Promise(async function (resolve, reject) {
    var result = false;
    filePath = path.resolve(filePath);
    exports.getFiles(pattern, options, function (err, filesInPattern) {
      filesInPattern.forEach(function (files) {
        files.files.forEach(function (file) {
          var currentFile = path.resolve(path.join(files.root, file));
          if (currentFile === filePath) {
            result = true;
          }
        });
      });
      resolve(result);
    });
  });
}



/*
@function writeToDisk (private)
@param output {string} [Output folder]
@param data {string} [Data to write]
@param callback
 */
exports.writeToDisk = function (output, data, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.writeToDisk(output, data, function (error) {
        error ? reject(error) : resolve();
      });
    });
  }
  fs.mkdirp(path.dirname("" + output), function (err) {
    if (err) {
      if (callback) {
        callback(err);
      }
      return console.log(err);
    }
    fs.writeFile("" + output, data, function (err) {
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
}

/*
@function writeToDisk (private)
@param output {string} [Output folder]
@param data {string} [Data to write]
@param callback
 */
// function writeToDisk(output, data, callback) {
//   fs.mkdirp(path.dirname("" + output), function (err) {
//     if (err) {
//       if (callback) {
//         callback(err);
//       }
//       return console.log(err);
//     }
//     fs.writeFile("" + output, data, function (err) {
//       if (err) {
//         if (callback) {
//           callback(err);
//         }
//         return console.log(err);
//       } else {
//         if (callback) {
//           callback();
//         }
//       }
//     });
//   });
// };


/*
@function getRelativeOutput (private) [Get path relative to output from a file and its include pattern]
@param include [Include patterns]
@param output
@param filePath
@param options [delete: Flag to know if the file was deleted so it skips files in pattern check]
*/
exports.getRelativeOutput = async function getRelativeOutput(include, output, filePath, options, callback) {
  if (!callback) {
    return new Promise(function (resolve, reject) {
      exports.getRelativeOutput(include, output, filePath, options, function (error, data) {
        error ? reject(error) : resolve(data);
      });
    });
  }

  var options = options || {};
  var relativeOutput;
  if (!Array.isArray(include)) {
    var inPattern = await exports.isInPattern(filePath, include, null);
    if (inPattern || options.deleted) {
      var rootFromPattern = await exports.getRootFromPattern(include);
      // Relative output is where the template will be saved after parse
      relativeOutput = path.dirname(path.relative(rootFromPattern, filePath));
      relativeOutput = path.join(output, relativeOutput);
    }
  } else {
    for (const incl of include) {
      var inPattern = await exports.isInPattern(filePath, incl, null);
      if (inPattern || options.deleted) {
        var rootFromPattern = await exports.getRootFromPattern(incl);
        // Relative output is where the template will be saved after parse
        relativeOutput = path.dirname(path.relative(rootFromPattern, filePath));
        relativeOutput = path.join(output, relativeOutput);
      }
    }
  }
  callback(null, relativeOutput);
};


// @function getCommonBasePath (public) {string} [Return base path, what all have in common, for given paths] @param paths {string[]} [String with multiple path to compare]
exports.getCommonBasePath = function (paths) {
  var separator = path.sep;
  for (var pathI = 0; pathI < paths.length; pathI++) {
    paths[pathI] = paths[pathI].replace(new RegExp("(\\/+|\\\\+)", "g"), path.sep);
  }
  while (paths.length > 1) { // While there are more than 1 paths we keep mixing them
    for (var pathIndex = 1; pathIndex < paths.length; pathIndex = pathIndex + 1) { // We start on index 1 in order to take always index and the previous one
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
        var s1NextDir = s1.substring(0, s1.indexOf(separator)); // First folder
        s1 = s1.substring(s1.indexOf(separator), s1.length); // Path without first folder        
        if (s1[0] === separator) {
          s1 = s1.substring(1, s1.length);
        }
        var s2NextDir = s2.substring(0, s2.indexOf(separator)); // First folder
        s2 = s2.substring(s2.indexOf(separator), s2.length); // Path without first folder
        if (s2[0] === separator) {
          s2 = s2.substring(1, s2.length);
        }

        if (s1NextDir === s2NextDir) { // If both folders are equals, we add them
          result = path.join(result, s1NextDir);
        }
      }
      paths[pathIndex - 1] = result; // Replace the first one at paths array
      paths.splice(pathIndex, 1); // Delete the last one because we mix them both
    }
  }
  return paths[0];
};