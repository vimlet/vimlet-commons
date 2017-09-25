var fs = require("fs-extra");
var path = require("path");

exports.isDirectory = function(filePath) {
  return fs.statSync(filePath).isDirectory();
};

exports.getFileSize = function(filePath) {

  try {

    if (!exports.isDirectory(filePath)) {
      return fs.statSync(filePath).size;
    }

  } catch (error) {
    return -1;
  }

  return 0;

};

exports.resolveObject = function(path, obj) {

  return path.split(".").reduce(function(prev, curr) {
    return prev ? prev[curr] : undefined;
  }, obj || self);
  
};
