var path = require("path");
var fs = require("fs-extra");
var request = require("request");
var progress = require("./progress.js");
var util = require("./util.js");

exports.download = function (url, dest, downloadHandler, outputHandler, doneHandler) {
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

      util.output("\nDownloading " + url + "\n", outputHandler);

      // Change the total bytes value to get progress later
      totalBytes = parseInt(data.headers["content-length"]);
      progressHandler = progress.progressHandler(totalBytes, 99, null, outputHandler);

      // Make parent directories
      fs.mkdirsSync(destDirectory);

      var writer = fs.createWriteStream(destPath);

      // Note we wait till file finish writing
      writer.on("finish", function () {
        if (doDownload) {

          progressHandler.showProgress(100);
          util.output("\n", outputHandler);

          if (doneHandler) {
            doneHandler();
          }

        }

      });

      // Pipe dest output
      req.pipe(writer);

    } else {

      // Show failed message if no downloadHandler found
      util.output("Download failed, response " + data.statusCode, outputHandler);

      // Trigger doneHandle if statusCode is an invalid download code
      if (doneHandler) {
        var error = data.statusCode + "";

        // Make sure we return something
        if (!error || error == "") {
          error = "true";
        }

        doneHandler(error);
      }

    }
  });

  req.on("data", function (chunk) {
    if (doDownload) {
      // Update the received bytes
      receivedBytes += chunk.length;

      if (downloadHandler) {
        downloadHandler(receivedBytes, totalBytes);
      }

      // Default progress
      progressHandler.showProgressChange(receivedBytes);

    }
  });

  req.on("error", function (error) {

    // Make sure we return something
    if (!error || error == "") {
      error = "true";
    }

    if (doneHandler) {
      doneHandler(error);
    }

    util.output(error, outputHandler);

  });
};
