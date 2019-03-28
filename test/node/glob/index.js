var glob = require("../../../src/node/modules/glob");;

var paths = [
  "/a/b/c",
  "/a"
];
var patterns = ["/a**"]

var matches = glob.match(paths, patterns);

console.dir(matches);