var path = require("path");
var commons = require("@vimlet/commons");

var pack = path.join(__dirname, "resources/compress/pack");
var packP = path.join(__dirname, "resources/compress/pack/**/*.*");
var unpack = path.join(__dirname, "output/unpackFolder");
var unpackP = path.join(__dirname, "output/unpackFiles");
var out = path.join(__dirname, "output/compressFolder.zip");
var outP = path.join(__dirname, "output/compressFiles.zip");


commons.run.exec("vimlet-compress", {args:["-i", pack, "-o", out]}, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log("done compress!");
    commons.run.exec("vimlet-compress", {args:["-i", packP, "-o", outP]}, function (error, data) {
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
        commons.run.exec("vimlet-compress", {args:["-i", outP, "-o", unpackP, "-u"]}, function (error, data) {
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