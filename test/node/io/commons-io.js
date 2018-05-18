var commons = require("../../../src/node/commons");


var include = "resources/test1/**/*.*";
var include2 = "resources/test2/**/*.*";
var exclude = "resources/test1/excluded/**/*";
var exclude2 = "resources/test2/excluded/**/*";
var includeFolder = "resources/test1";
var includeFile = "resources/test1/js3.js.md";

//var files = commons.io.getFiles([include,include2], [exclude,exclude2]);
//var files = commons.io.getFiles(include, exclude);
// var files = commons.io.getFiles(includeFolder);
//var files = commons.io.getFiles(includeFile);



//console.log(files);


console.log("Estoy en pattern", commons.io.isInPattern("resources/test1/folder2.js.md", "resources/test1/**/*.*"));
console.log("NO estoy en pattern", commons.io.isInPattern("resources/test1/peter.md", "resources/test1/**/*.*"));


// Testing rimraf delte folder
var detelePath = "resources/test3";
commons.io.deleteFolderRecursive(detelePath);