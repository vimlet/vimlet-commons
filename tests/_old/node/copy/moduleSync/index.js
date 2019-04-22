var copy = require("../../../../src/node/modules/copy");
var include = "resources";
var excludeFolder = "resources/exclude";
var output = "output";


copy.copySync(include, output, {exclude: excludeFolder});
console.log("Done!");    

