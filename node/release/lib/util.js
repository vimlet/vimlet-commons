var fs = require("fs-extra");
var path = require('path');

exports.isDirectory = function(filePath) {
  return fs.statSync(filePath).isDirectory();
};

exports.resolveObject = function(path, obj) {
  return path.split('.').reduce(function(prev, curr) {
    return prev ? prev[curr] : undefined;
  }, obj || self);
};
