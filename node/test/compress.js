var vimlet_commons = require("../release");
var path = require("path");

var pack = path.resolve("./resources/compress/pack");
var unpack = path.resolve("./resources/compress/unpack");
var out = path.resolve("./resources/compress/compress");

// vimlet_commons.compress.pack(pack, out, "zip");
// vimlet_commons.compress.unpack(out, unpack, "zip");

//vimlet_commons.compress.pack(pack, out, "tar");
//vimlet_commons.compress.unpack(out, unpack, "tar");

vimlet_commons.compress.pack(pack, out, "tar", function (entry) {
  if(entry){
    console.log(entry);
  }
});
vimlet_commons.compress.unpack(out, unpack, "tar", function (entry) {
  if(entry) {
    console.log(entry);
  }
});

// vimlet_commons.compress.pack(pack, out, "tgz");
// vimlet_commons.compress.unpack(out, unpack, "tgz");
