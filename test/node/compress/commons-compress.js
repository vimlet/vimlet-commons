var commons = require("../../../src/node/commons");
var path = require("path");

var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "resources/compress/unpack");
var out = path.join(__dirname, "resources/compress/compress");



commons.compress.pack(pack, out, "zip", {
  doneHandler: function (error) {
    if (!error) {
      commons.compress.unpack(out, unpack, "zip", {
        doneHandler: function (error) {
          console.log("Done");
        }
      });
    }
  }
});