var path = require('path');
var fs = require("fs-extra");
var request = require('request');
var deasync = require('deasync');

exports.download = function(url, file, handler) {

  var syncDownload = true;

  // Last percentage shown
  var lastProgress = null;
  var error = false;

  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

  var req = request({
    method: 'GET',
    uri: url
  });

  var filePath = path.resolve(file);
  var fileDirectory = path.dirname(filePath);

  // Make parent directorys
  fs.mkdirsSync(fileDirectory);

  var out = fs.createWriteStream(filePath);
  req.pipe(out);

  req.on('response', function(data) {
    // Change the total bytes value to get progress later.
    total_bytes = parseInt(data.headers['content-length']);
  });

  req.on('data', function(chunk) {

    // Update the received bytes
    received_bytes += chunk.length;

    if (handler) {
      handler(received_bytes, total_bytes);
    } else {

      var percentage = Math.ceil((received_bytes * 100) / total_bytes);

      if (lastProgress != percentage) {

        lastProgress = percentage;
        showProgress( percentage);

      }

    }


  });

  req.on('end', function() {

    syncDownload = false;

    if(handler) {
      handler(null, null, true);
    } else {
      console.log("File succesfully downloaded");
    }


  });

  req.on('error', function(error) {

    error = true;
    syncDownload = false;

    if(handler) {
      handler(null, null, null, error);
    } else {
      console.log(error);
    }

  });

  // Force sync
  while (syncDownload) {
    deasync.sleep(100);
  }

  return !error;

};

function showProgress(percentage) {
    console.log(percentage + "%");
}
