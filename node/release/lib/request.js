var path = require("path");
var fs = require("fs-extra");
var request = require("request");
var deasync = require("deasync");
var progress = require("./progress.js");


exports.download = function (url, dest, doneHandler, downloadHandler) {

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


  req.on("response", function (data) {

    if (data.statusCode >= 200 && data.statusCode < 400) {

      doDownload = true;

      // Change the total bytes value to get progress later.
      totalBytes = parseInt(data.headers["content-length"]);
      progressHandler = downloadHandler ? null : progress.progressHandler(totalBytes, 99);

      // Make parent directories
      fs.mkdirsSync(destDirectory);

      // Pipe dest output
      req.pipe(fs.createWriteStream(destPath));

    } else {
      if (downloadHandler) {
        downloadHandler(data.statusCode + "");
      } else {
        handleError("Download failed, response " + data.statusCode);
      }
    }
  });

  req.on("data", function (chunk) {

    if (doDownload) {

      // Update the received bytes
      receivedBytes += chunk.length;

      if (downloadHandler) {
        downloadHandler(null, receivedBytes, totalBytes);
      } else {

        // Default progress
        progressHandler.showProgressChange(receivedBytes);

      }

    }

  });

  req.on("end", function () {

    if (doDownload) {

      if (doneHandler) {
        doneHandler();
      }

      if(!downloadHandler) {
        progressHandler.showProgress(100);
        downloadComplete();
      }

    }

  });

  req.on("error", function (error) {

    if (!error || error == "") {
      error = true;
    }

    if (downloadHandler) {
      downloadHandler(error);
    } else {
      handleError(error);
    }

  });


};

exports.downloadSync = function (url, dest, doneHandler, downloadHandler) {

  var forceSync = true;

  exports.download(url, dest, function () {

    forceSync = false;

    if (doneHandler) {
      doneHandler();
    } 

  }, downloadHandler);

  // Force sync
  while (forceSync) {
    deasync.sleep(100);
  }

};

function handleError(error) {
  console.log(error);
}

function downloadComplete() {
  console.log("Download complete");
}