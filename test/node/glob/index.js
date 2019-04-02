var glob = require("../../../src/node/modules/glob");;

var paths = [
  "/a/b/c",
  "/a"
];
// var patterns = ["/a**"];
var patterns = ["**.js"];

var matches = glob.match(paths, patterns);

glob.files(patterns, {
  path: __dirname
}, function (error, result) {
  console.dir(result);
});

glob.files(patterns, {
  path: __dirname
}).then(function (result) {
  console.dir(result);
}).catch(function(error){
  console.log(error);
});

console.dir(matches);