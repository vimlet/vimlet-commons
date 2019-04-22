var compress = require("../../../../src/node/modules/compress");
var io = require("../../../../src/node/modules/io");
var path = require("path");
var fs = require("fs-extra");

var pack = path.join(__dirname, "resources/compress/pack/**/*.*");
// var pack = path.join(__dirname, "resources/compress/pack");
var exclude = path.join(__dirname, "resources/compress/exclude/**/*.*");
var unpack = path.join(__dirname, "output/unpack");
var out = path.join(__dirname, "output/compress.zip");


compress.pack(pack, out, "zip", {
  doneHandler: function (error) {
    if (!error) {
      console.log("Done Compress");   
      compress.unpack(out, unpack, "zip", {
        doneHandler: function (error) {
          console.log("Done upack");
        }
      });
    }
  },
  exclude: exclude
});
