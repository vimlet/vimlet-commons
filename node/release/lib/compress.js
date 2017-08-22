var fs = require("fs-extra");
var path = require('path');

exports.pack = function(file, out, format) {

  switch (format) {
    case "zip":

      break;
    case "tar":

      break;
    case "targz":

      break;
    default:

  }

};

exports.unpack = function(file, out, format) {

};

function packZip() {
  // create a file to stream archive data to.
  var output = fs.createWriteStream(path.resolve(file));
  var archive = archiver('zip', {
    zlib: {
      level: 6
    } // Sets the compression level.
  });
}

function unpackZip() {

}
