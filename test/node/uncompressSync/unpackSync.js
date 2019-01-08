var compress = require("../../../src/node/modules/compress");
var io = require("../../../src/node/modules/io");
var path = require("path");
var fs = require("fs-extra");

// var pack = path.join(__dirname, "resources/compress/pack/**/*.*");
var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "out/unpack");
var out = path.join(__dirname, "out/compress.zip");


compress.packSync(pack, out);



compress.unpackSync(out, unpack, null);