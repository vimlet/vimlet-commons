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

console.dir(matches);