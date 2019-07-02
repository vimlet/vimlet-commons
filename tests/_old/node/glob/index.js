var glob = require("../../../../src/node/modules/glob");;

var paths = [
  "/a/b/c.txt",
  "/a"
];
var patternsMatch = ["/a**.txt"];
var patternsFiles = ["**.js"];

var matches = glob.match(paths, patternsMatch);
console.dir(matches);
var matchesNoExt = glob.match(paths, patternsMatch, {ignoreExtension:true});
console.log("IgnoreExtension",matchesNoExt);

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


// glob.files("resources/**/subfolder/build.**.js").then(data => {
//   console.log(data);
// }).catch(e => {
//   console.log("Err");
// })