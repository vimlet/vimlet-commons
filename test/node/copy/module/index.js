var copy = require("../../../../src/node/modules/copy");
var include = "resources";
var excludeFolder = "resources/exclude";
var output = "output";


copy.copy(include, output, {exclude: excludeFolder}, function(){
    console.log("Done!");    
});


// copy.watch(include, output, {exclude: excludeFolder});