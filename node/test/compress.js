var vimlet_commons = require("../release");
var path = require("path");

var pack = path.resolve(__dirname + "/resources/compress/pack");
var unpack = path.resolve(__dirname + "/resources/compress/unpack");
var out = path.resolve(__dirname + "/resources/compress/compress.zip");

vimlet_commons.compress.pack(pack, out, "zip");
vimlet_commons.compress.unpack(out, unpack, "zip");
