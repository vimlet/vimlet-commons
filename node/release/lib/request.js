var path = require("path");
var fs = require("fs-extra");
var request = require("request");
var deasync = require("deasync");

exports.download = function(url, file, handler) {

  var forceSync = true;

  // Last percentage shown
  var lastProgress = null;
  var error = false;

  // Save variable to know progress
  var receivedBytes = 0;
  var totalBytes = 0;

  var req = request({
    method: "GET",
    uri: url
  });

  var filePath = path.resolve(file);
  var fileDirectory = path.dirname(filePath);

  var doDownload = false;


  req.on("response", function(data) {

    if(data.statusCode >= 200 && data.statusCode < 400 ) {

      doDownload = true;

      // Change the total bytes value to get progress later.
      totalBytes = parseInt(data.headers["content-length"]);

      // Make parent directories
      fs.mkdirsSync(fileDirectory);

      // Pipe file output
      var out = fs.createWriteStream(filePath);
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
        handler(receivedBytes, totalBytes);
      } else {

        var percentage = Math.ceil((receivedBytes * 100) / totalBytes);

        if (lastProgress != percentage) {

          lastProgress = percentage;
          showProgress( percentage);

        }

      }

    }

  });

  req.on("end", function() {

    forceSync = false;

    if(doDownload) {

      if(handler) {
        handler(null, null, true);
      } else {
        downloadComplete();
      }

    }

  });

  req.on("error", function(error) {

    error = true;
    forceSync = false;

    if(handler) {
      handler(null, null, null, error);
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

function showProgress(percentage) {
    console.log(percentage + "%");
}

function downloadComplete() {
  console.log("Download complete");
}
