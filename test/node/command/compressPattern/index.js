var path = require("path");
var commons = require("@vimlet/commons");

var pack = path.join(__dirname, "resources/compress/pack");
var pack2 = path.join(__dirname, "resources/compress2/pack2");
var exclude = path.join(__dirname, "resources/compress/pack/exclude/**/*.*");
var unpack = path.join(__dirname, "output/unpack");
var out = path.join(__dirname, "output/compress.zip");


commons.run.exec("vimlet-compress", {args:["-i", pack + "," + pack2, "-o", out, "-e", exclude]}, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log("done compress!");
    commons.run.exec("vimlet-compress", {args:["-i", out, "-o", unpack, "-u"]}, function (error, data) {
      if (error) {
        console.error(error);
      } else {
        console.log("done uncompress!");
      }
    });
  }
});
