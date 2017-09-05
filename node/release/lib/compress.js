var fs = require("fs-extra");
var path = require("path");
var compressing = require("compressing");
var deasync = require("deasync");
var pipe = require("multipipe");
var util = require("./util.js");
var progress = require("./progress.js");

function getStreamObject(stream) {

  var baseStream = stream;

  if (!baseStream._onEntryFinish) {
    // Must be tgz
    baseStream = stream._tarStream;
  }

  return baseStream;

}

// Hook _onEntryFinish(err) of stream.js
function hookOnEntryFinish(stream, fn) {

  // NOTE this might break on future releases of compressing module,
  // Using exact version on package.json is recommended to stay safe
  // (Compressing Module Version: 1.2.3)

  var originalFunction = stream._onEntryFinish;

  stream._onEntryFinish = function (err) {

    // Current entries befire shift()
    if (this._waitingEntries && this._waitingEntries.length > 0) {
      fn(this._waitingEntries[0][0]);
    }

    originalFunction.apply(this, arguments);

  };

}

exports.pack = function (file, dest, format, handler) {

  if (format === "zip" ||
    format === "tar" ||
    format === "tgz") {
    packHelper(file, dest, format, handler);
  } else {
    console.log("Unsupported format");
  }

};

exports.unpack = function (file, dest, format, handler) {

  format = format.toLowerCase();

  if (format === "zip" ||
    format === "tar" ||
    format === "tgz") {
    unpackHelper(file, dest, format, handler);
  } else {
    console.log("Unsupported format");
  }

};

function packHelper(file, dest, format, handler) {

  var forceSync = true;

  var packSizeObject = getPackSizeObject(getFileList(file));
  var fileStream = new compressing[format].Stream();
  var streamObject = getStreamObject(fileStream);

  var totalCount = packSizeObject.count;
  var totalSize = packSizeObject.totalSize;
  var totalProgress = 0;

  var currentEntry;
  var currentEntrySize;

  var progressHandler;

  hookOnEntryFinish(streamObject, function (entry) {

    if (!util.isDirectory(entry)) {

      // Store currentEntry
      currentEntry = entry;

      // Update size
      currentEntrySize = packSizeObject.files[entry];
      totalProgress += currentEntrySize;

      if (handler) {

        // Custom progress
        handler(null, null, currentEntry, currentEntrySize, totalSize, totalCount);

      } else {

        // Default progress
        if (!progressHandler) {
          progressHandler = progress.progressHandler(totalSize, 99);
        }

        progressHandler.showProgressChange(totalProgress);

      }

    }

  });

  // Add file or directories
  if (util.isDirectory(file)) {
    fileStream.addEntry(file, {
      ignoreBase: true
    });
  } else {
    fileStream.addEntry(file);
  }


  var destStream = fs.createWriteStream(dest);

  pipe(fileStream, destStream, function (error) {

    forceSync = false;

    if (error) {

      if (handler) {
        handler(null, error);
      } else {
        handleError(error);
      }

    } else {

      if (handler) {
        handler(true);
      } else {

        // Show 100%;
        progressHandler.showProgress(100);
        packComplete();

      }

    }

  });

  while (forceSync) {
    deasync.sleep(100);
  }

}

function unpackHelper(file, dest, format, handler) {

  var forceSync = true;

  // Make dest directory
  fs.mkdirsSync(dest);

  var unpackSizeObject = getUnpackSizeObject(file, format);

  var totalCount = unpackSizeObject.count;
  var totalSize = unpackSizeObject.totalSize;
  var totalProgress = 0;

  var currentEntry;
  var currentEntrySize;

  var progressHandler;

  var fileStream = new compressing[format].UncompressStream({
    source: file
  });

  fileStream.on("finish", function () {

    forceSync = false;

    if (handler) {
      handler(true);
    } else {

      // Show 100%;
      progressHandler.showProgress(100);
      unpackComplete();

    }

  });

  fileStream.on("error", function (error) {

    forceSync = false;

    if (handler) {
      handler(null, error);
    } else {
      handleError(error);
    }

  });

  fileStream.on("entry", function (header, stream, next) {

    // Store currentEntry
    currentEntry = path.join(dest, header.name);

    // Update size
    currentEntrySize = getEntryUncompressedSize(header);
    totalProgress += currentEntrySize;

    // Write entry
    onUnpackEntryWrite(header, stream, next, dest);

    if (handler) {

      // Custom progress
      handler(null, null, currentEntry, currentEntrySize, totalSize, totalCount);

    } else {

      // Default progress
      if (!progressHandler) {
        progressHandler = progress.progressHandler(totalSize, 99);
      }

      progressHandler.showProgressChange(totalProgress);

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

function getUnpackSizeObject(file, format) {

  // Will attempt to find the total size in bytes of the UncompressStream, if not possible
  // file count will be provided instead
  var forceSync = true;

  var sizeObject = {
    useFileCount: false,
    totalSize: 0,
    count: 0
  };

  var fileStream = new compressing[format].UncompressStream({
    source: file
  });

  fileStream.on("finish", function () {
    forceSync = false;
  });

  fileStream.on("error", function (error) {

    forceSync = false;
    sizeObject.count = -1;
    handleError(error);

  });

  fileStream.on("entry", function (header, stream, next) {

    var sizeValue = getEntryUncompressedSize(header);

    if (sizeValue != -1) {
      sizeObject.totalSize += sizeValue;
    } else {
      sizeObject.useFileCount = true;
    }

    sizeObject.count++;

    // Must resume to avoid stream block
    stream.resume();
    next();

  });

  while (forceSync) {
    deasync.sleep(100);
  }

  return sizeObject;

}

// Recursive function
function getFileList(dir, fileList) {

  fileList = fileList || [];
  files = fs.readdirSync(dir);

  files.forEach(function (file) {
    if (util.isDirectory(path.join(dir, file))) {
      fileList = getFileList(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  });

  return fileList;

}

function getPackSizeObject(fileList) {

  var sizeObject = {
    files: {},
    totalSize: 0,
    count: fileList.length
  };

  var file;
  var size;

  for (var i = 0; i < fileList.length; i++) {

    file = fileList[i];
    size = util.getFileSize(file);

    sizeObject.files[file] = size;
    sizeObject.totalSize += size;

  }

  return sizeObject;

}

function onUnpackEntryWrite(header, stream, next, dest) {

  // header.type => file | directory
  // header.name => path name

  stream.on("end", next);

  if (header.type === "file") {

    var file = path.join(dest, header.name);
    var parent = path.dirname(file);

    try {
      fs.mkdirsSync(parent);
    } catch (error) {
      // Do nothing
    }

    stream.pipe(fs.createWriteStream(file));

  } else { // directory
    // Note this is just per compressing API specification but never triggers
    fs.mkdirsSync(path.join(dest, header.name));
    stream.resume();
  }

}

function packComplete() {
  console.log("Pack complete");
}

function unpackComplete() {
  console.log("Unpack complete");
}

function handleError(error) {
  console.log(error);
}

function showProgress(percentage) {
  console.log(percentage + "%");
}
