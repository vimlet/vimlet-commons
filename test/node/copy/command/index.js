var commons = require("@vimlet/commons");
var path = require("path");
var run = require("../../../../src/node/modules/run");


var include = path.join(__dirname, "resources/**/*.*");
var output = path.join(__dirname, "output");



// run.exec("vimlet-copy", {args:["-i", include, "-o", output]}, function (error, data) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("done!");
//   }
// });




commons.run.exec("vimlet-copy", {args:["-i", include, "-o", output]}, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log("done!");
    }
  });

  
// commons.run.exec("vimlet-copy", {args:["-w", "-i", "resources/**/*.*", "-o", "output"]}, function (error, data) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("Watching!");
//   }
// });