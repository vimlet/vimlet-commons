var fs = require("fs-extra");
var path = require('path');
var compressing = require('compressing');
var deasync = require('deasync');
var util = require(__dirname + "/util.js");
var pipe = require('multipipe');

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

  format = format.toLowerCase();

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

  var fileStream = new compressing[format].Stream();

  // Add file or directories
  if (util.isDirectory(file)) {
    fileStream.addEntry(file, { ignoreBase: true });
  } else {
    fileStream.addEntry(file);
  }

  var destStream = fs.createWriteStream(out);

  pipe(fileStream, destStream, function (error) {
    forceSync = false;
    if(error){
      console.log(error);
    } else {
      console.log("done");
    }
  });

  while (forceSync) {
    deasync.sleep(100);
  }

}

function unpackHelper(file, out, format) {

  var forceSync = true;

  // Make out directory
  fs.mkdirsSync(out);

  var totalUncompressedSizeObject = getTotalUncompressedSize(file, format);

  var total_size = totalUncompressedSizeObject.size;
  var total_unpack = 0;

  var lastProgress = 0;

  new compressing[format].UncompressStream({
      source: file
    })
    .on('finish', function() {

      forceSync = false;
      compressDone();

      // TODO remove total
      console.log("total bytes: " + total_size);
      console.log("uncompressed bytes: " + total_unpack);

    })
    .on('error', function(error) {

      forceSync = false;
      handleError(error);

    })
    .on('entry', function(header, stream, next) {

      // Use fileSize or fileCount mode
      var entrySize;
      if (totalUncompressedSizeObject.useFileCount) {
        entrySize = 1;
      } else {
        entrySize = getEntryUncompressedSize(header);
      }

      // Write entry
      onEntryWrite(header, stream, next, out);

      // Update total_unpack
      total_unpack += entrySize;

      var percentage = Math.ceil((total_unpack * 100) / total_size);

      if (lastProgress != percentage) {

        lastProgress = percentage;
        showProgress(percentage);

      }

    });

  while (forceSync) {
    deasync.sleep(100);
  }

}

function getEntryUncompressedSize(header) {

  var sizeProperty = "size";
  var sizeValue;
  var size = 0;

  if (header.yauzl) {
    sizeProperty = "yauzl.uncompressedSize";
  }

  size = util.resolveObject(sizeProperty, header);

  return size == null || typeof size == "undefined" ? -1 : size;

}

function getTotalUncompressedSize(file, format) {

  // Will attempt to find the total size in bytes of the UncompressStream, if not possible
  // file count will be provided instead

  var useFileCount = false;

  var count = 0;
  var size = 0;

  var forceSync = true;

  new compressing[format].UncompressStream({
      source: file
    })
    .on('finish', function() {
      forceSync = false;
    })
    .on('error', function(error) {
      forceSync = false;
      count = -1;
    })
    .on('entry', function(header, stream, next) {

      var sizeValue = getEntryUncompressedSize(header);

      if (sizeValue != -1) {
        size += sizeValue;
      } else {
        useFileCount = true;
      }

      count++;
      next();

    });

  while (forceSync) {
    deasync.sleep(100);
  }

  return {
    useFileCount: useFileCount,
    size: useFileCount ? count : size
  };

}

function getEntryPathSize() {

}

function getTotalPathSize() {

}

function onEntryWrite(header, stream, next, out) {

  // header.type => file | directory
  // header.name => path name

  stream.on('end', next);

  if (header.type === 'file') {

    var file = path.join(out, header.name);
    var parent = path.dirname(file);

    try {
      fs.mkdirsSync(parent);
    } catch (error) {
      // Do nothing
    }

    stream.pipe(fs.createWriteStream(file));

  } else { // directory
    // Note this is just per API specification but never triggers
    fs.mkdirsSync(path.join(out, header.name));
    stream.resume();
  }
}

function compressDone() {
  console.log("done");
}

function handleError(error) {
  console.log(error);
}

function showProgress(percentage) {
  console.log(percentage + "%");
}
