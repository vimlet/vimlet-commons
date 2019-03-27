var matcher = require("../../../src/node/modules/matcher");;

var paths = ["/a/b/c"];
var patterns = ["/a*"]

var matches = matcher.isMatch(paths, patterns);

console.dir(matches);