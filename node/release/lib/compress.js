var fs = require("fs-extra");
var path = require("path");
var compressing = require("compressing");
var deasync = require("deasync");
var pipe = require("multipipe");
var util = require(__dirname + "/util.js");

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

  stream._onEntryFinish = function(err) {

    // Current entries befire shift()
    if (this._waitingEntries && this._waitingEntries.length > 0) {
      fn(this._waitingEntries[0][0]);
    }

    originalFunction.apply(this, arguments);

  };

}

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

  var sizeObject = getFileListSize(getFileList(file));
  var fileStream = new compressing[format].Stream();
  var streamObject = getStreamObject(fileStream);

  var total_size = sizeObject.total;
  var total_pack = 0;
  var lastProgress = 0;


  hookOnEntryFinish(streamObject, function(entry) {

    if(!util.isDirectory(entry)) {

      // Update total_unpack
      total_pack += sizeObject.files[entry];

      var percentage = Math.ceil((total_pack * 100) / total_size);

      if (lastProgress != percentage) {

        lastProgress = percentage;
        showProgress(percentage);

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


  var destStream = fs.createWriteStream(out);

  pipe(fileStream, destStream, function(error) {
    forceSync = false;
    if (error) {
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
    .on("finish", function() {

      forceSync = false;
      unpackComplete();

    })
    .on("error", function(error) {

      forceSync = false;
      handleError(error);

    })
    .on("entry", function(header, stream, next) {

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
    .on("finish", function() {
      forceSync = false;
    })
    .on("error", function(error) {
      forceSync = false;
      count = -1;
    })
    .on("entry", function(header, stream, next) {

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

// Recursive function
function getFileList(dir, fileList) {

  fileList = fileList || [];
  files = fs.readdirSync(dir);

  files.forEach(function(file) {
    if (util.isDirectory(path.join(dir, file))) {
      fileList = getFileList(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  });

  return fileList;

}

function getFileListSize(fileList) {

  var sizeObject = {
    files: {

    },
    total: 0,
    count: fileList.length
  };

  var file;
  var size;

  for (var i = 0; i < fileList.length; i++) {

    file = fileList[i];
    size = util.getFileSize(file);

    sizeObject.files[file] = size;
    sizeObject.total += size;

  }

  return sizeObject;

}

function onEntryWrite(header, stream, next, out) {

  // header.type => file | directory
  // header.name => path name

  stream.on("end", next);

  if (header.type === "file") {

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
