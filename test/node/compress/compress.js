var compress = require("../../../src/node/modules/compress");
var path = require("path");

var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "resources/compress/unpack");
var out = path.join(__dirname, "resources/compress/compress");

// compress.pack(pack, out, "tar", null, null, function (error) {
//     if (!error) {
//         compress.unpack(out, unpack, "tar");
//     }
// });

compress.pack(pack, out, "zip", {
  doneHandler: function (error) {
    if (!error) {
      compress.unpack(out, unpack, "zip", {
        doneHandler: function (error) {
          console.log("Done");
        }
      });
    }
  }
});