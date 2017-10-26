var commons = require("../../src/node");
var path = require("path");

var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "resources/compress/unpack");
var out = path.join(__dirname, "resources/compress/compress");

// commons.compress.pack(pack, out, "tar", null, function (error) {
//     if (!error) {
//         commons.compress.unpack(out, unpack, "tar");
//     }
// });

commons.compress.pack(pack, out, "zip", null, function(error) {
  if (!error) {
    commons.compress.unpack(out, unpack, "zip");
  }
});
