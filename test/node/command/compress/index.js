var path = require("path");
var commons = require("@vimlet/commons");
var compress = "../../../../src/node/modules/compress";

var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "resources/compress/unpack");
var out = path.join(__dirname, "resources/compress/compress.zip");



commons.run.exec("node", {args:[compress, "-i", pack, "-o", out, "-p"]}, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log("done compress!");


    commons.run.exec("node", {args:[compress, "-i", out, "-o", unpack, "-u"]}, function (error, data) {
      if (error) {
        console.error(error);
      } else {
        console.log("done uncompress!");
      }
    });



  }
});

