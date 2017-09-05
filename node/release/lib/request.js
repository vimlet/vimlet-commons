var path = require("path");
var fs = require("fs-extra");
var request = require("request");
var deasync = require("deasync");
var progress = require("./progress.js");


exports.download = function(url, dest, handler) {

  var forceSync = true;
  var error = false;

  var progressHandler;

  // Save variable to know progress
  var receivedBytes = 0;
  var totalBytes = 0;

  var req = request({
    method: "GET",
    uri: url
  });

  var destPath = path.resolve(dest);
  var destDirectory = path.dirname(destPath);

  var doDownload = false;


  req.on("response", function(data) {

    if(data.statusCode >= 200 && data.statusCode < 400 ) {

      doDownload = true;

      // Change the total bytes value to get progress later.
      totalBytes = parseInt(data.headers["content-length"]);

      // Make parent directories
      fs.mkdirsSync(destDirectory);

      // Pipe dest output
      var out = fs.createWriteStream(destPath);
      req.pipe(out);

    } else {
      handleError("Download failed, response " + data.statusCode);
    }

  });

  req.on("data", function(chunk) {

    if(doDownload) {

      // Update the received bytes
      receivedBytes += chunk.length;

      if (handler) {
        handler(null, null, receivedBytes, totalBytes);
      } else {

        // Default progress
        if (!progressHandler) {
          progressHandler = progress.progressHandler(totalBytes, 99);
        }

        progressHandler.showProgressChange(receivedBytes);

      }

    }

  });

  req.on("end", function() {

    forceSync = false;

    if(doDownload) {

      if(handler) {
        handler(true);
      } else {

        progressHandler.showProgress(100);
        downloadComplete();

      }

    }

  });

  req.on("error", function(error) {

    error = true;
    forceSync = false;

    if(handler) {
      handler(null, error);
    } else {
      handleError(error);
    }

  });

  // Force sync
  while (forceSync) {
    deasync.sleep(100);
  }

  return !error;

};

function handleError(error) {
  console.log(error);
}

function downloadComplete() {
  console.log("Download complete");
}