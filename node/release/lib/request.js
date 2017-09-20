var path = require("path");
var fs = require("fs-extra");
var request = require("request");
var deasync = require("deasync");
var progress = require("./progress.js");


exports.download = function (url, dest, downloadHandler, doneHandler) {

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

    // Handle the statusCode
    if (downloadHandler) {
      downloadHandler(null, null, data.statusCode);
    }

    if (data.statusCode >= 200 && data.statusCode < 400) {

      doDownload = true;

      // Change the total bytes value to get progress later
      totalBytes = parseInt(data.headers["content-length"]);
      progressHandler = downloadHandler ? null : progress.progressHandler(totalBytes, 99);

      // Make parent directories
      fs.mkdirsSync(destDirectory);

      // Pipe dest output
      req.pipe(fs.createWriteStream(destPath));

    } else {

      // Trigger doneHandle if statusCode is an invalid download code 
      if (doneHandler) {

        var error = data.statusCode + "";

        // Make sure we return something
        if (!error || error == "") {
          error = true;
        }

        doneHandler(error);
      }

      // Show failed message if no downloadHandler found
      if (!downloadHandler) {
        console.log("Download failed, response " + data.statusCode);
      }

    }

  });

  req.on("data", function (chunk) {

    if (doDownload) {

      // Update the received bytes
      receivedBytes += chunk.length;

      if (downloadHandler) {
        downloadHandler(receivedBytes, totalBytes);
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

      if (!downloadHandler) {
        
        progressHandler.showProgress(100);
        console.log("Download complete");

      }

    }

  });

  req.on("error", function (error) {

    // Make sure we return something
    if (!error || error == "") {
      error = true;
    }

    if (doneHandler) {
      doneHandler(error);
    } else {
      console.log(error);
    }

  });


};

exports.downloadSync = function (url, dest, downloadHandler) {

  var forceSync = true;
  var errorOutput = false;

  exports.download(url, dest, downloadHandler, function (error) {

    if (error) {
      errorOutput = true;
    }

    forceSync = false;

  });

  // Force sync
  while (forceSync) {
    deasync.sleep(100);
  }

  // Download successful
  return !errorOutput;

};
