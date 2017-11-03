var commons = require("../../src/node");


var include = "resources/io/test1/**/*.*";
var include2 = "resources/io/test2/**/*.*";
var exclude = "resources/io/test1/excluded/**/*";
var exclude2 = "resources/io/test2/excluded/**/*";
var includeFolder = "resources/io/test1";
var includeFile = "resources/io/test1/js3.js.md";

//var files = commons.io.getFiles([include,include2], [exclude,exclude2]);
//var files = commons.io.getFiles(include, exclude);
var files = commons.io.getFiles(includeFolder);
//var files = commons.io.getFiles(includeFile);



//console.log(files);


console.log("Estoy en pattern", commons.io.isInPattern("resources/io/test1/folder2.js.md", "resources/io/test1/**/*.*"));
console.log("NO estoy en pattern", commons.io.isInPattern("resources/io/test1/peter.md", "resources/io/test1/**/*.*"));
