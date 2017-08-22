var fs = require("fs-extra");
var path = require('path');
var compressing = require('compressing');
var deasync = require('deasync');

exports.pack = function(file, out, format) {

  if (format === "zip" ||
    format === "tar" ||
    format === "tgz") {
    packHelper(file, out, format);
  } else {
    console.log("Unsupported format");
  }

};

exports.unpack = function(file, out, format) {

  if (format === "zip" ||
    format === "tar" ||
    format === "tgz") {
    unpackHelper(file, out, format);
  } else {
    console.log("Unsupported format");
  }

};

function packHelper(file, out, format) {

  var forceSync = true;

  if (isDirectory(file)) {

    compressing[format].compressDir(file, out)
      .then(function() {
        forceSync = false;
        compressDone();
      })
      .catch(function(error) {
        forceSync = false;
        handleError(error);
      });

  } else {

    compressing[format].compressFile(file, out)
      .then(function() {
        forceSync = false;
        compressDone();
      })
      .catch(function(error) {
        forceSync = false;
        handleError(error);
      });

  }

  while (forceSync) {
    deasync.sleep(100);
  }

}

function unpackHelper(file, out, format) {

  var forceSync = true;

  compressing[format].uncompress(file, out)
    .then(function() {
      forceSync = false;
      compressDone();
    })
    .catch(function(error) {
      forceSync = false;
      handleError(error);
    });

  while (forceSync) {
    deasync.sleep(100);
  }

}

function compressDone() {
  console.log("done");
}

function handleError(error) {
  console.log(error);
}

function isDirectory(filePath) {
  return fs.statSync(filePath).isDirectory();
}
