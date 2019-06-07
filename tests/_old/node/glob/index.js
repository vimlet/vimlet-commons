var glob = require("../../../../src/node/modules/glob");;

var paths = [
  "/a/b/c",
  "/a"
];
var patternsMatch = ["/a**"];
var patternsFiles = ["**.js"];

var matches = glob.match(paths, patternsMatch);

// glob.files(patternsFiles, {
//   path: __dirname
// }, function (error, result) {
//   console.dir(result);
// });

// glob.files(patternsFiles, {
//   path: __dirname
// }).then(function (result) {
//   console.dir(result);
// }).catch(function (error) {
//   console.log(error);
// });

// console.dir(matches);


glob.files("resources/**/subfolder/build.**.js").then(data => {
  console.log(data);
}).catch(e => {
  console.log("Err");
})