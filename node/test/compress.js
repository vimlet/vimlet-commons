var vimlet_commons = require("../release");
var path = require("path");

var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "resources/compress/unpack");
var out = path.join(__dirname, "resources/compress/compress");

// vimlet_commons.compress.pack(pack, out, "zip");
// vimlet_commons.compress.unpack(out, unpack, "zip");

//vimlet_commons.compress.pack(pack, out, "tar");
//vimlet_commons.compress.unpack(out, unpack, "tar");


// vimlet_commons.compress.packSync(pack, out, "tgz");
// console.log("In sync mode this message should appear last!");

vimlet_commons.compress.unpackSync(out, unpack, "tgz");
console.log("In sync mode this message should appear last!");

// vimlet_commons.compress.pack(pack, out, "tar", function (done, error, entry) {
//   if(entry){
//     console.log(entry);
//   }
// });
// vimlet_commons.compress.unpack(out, unpack, "tar", function (done, error, entry) {
//   if(entry) {
//     console.log(entry);
//   }
// });