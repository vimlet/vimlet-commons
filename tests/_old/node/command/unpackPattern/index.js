var path = require("path");
var commons = require("@vimlet/commons");

var pack = path.join(__dirname, "resources/compress/pack");
var pack2 = path.join(__dirname, "resources/compress2/pack2");
var pack3 = path.join(__dirname, "resources/compress3/pack3");
var exclude = path.join(__dirname, "resources/compress/pack/exclude/**/*.*");
var unpack = path.join(__dirname, "output/unpack");
var out = path.join(__dirname, "output/compress.zip");
var out2 = path.join(__dirname, "output/compress2.zip");


commons.run.exec("vimlet-compress", {args:["-i", pack + "," + pack2, "-o", out, "-e", exclude]}, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log("done compress!");
    commons.run.exec("vimlet-compress", {args:["-i", pack3, "-o", out2, "-e", exclude]}, function (error, data) {
      if (error) {
        console.error(error);
      } else {
        console.log("done compress!");
        commons.run.exec("vimlet-compress", {args:["-i", out + "," + out2, "-o", unpack, "-u"]}, function (error, data) {
          if (error) {
            console.error(error);
          } else {
            console.log("done uncompress!");
          }
        });    
      }
    });
  }
});
