var io = require("../../../src/node/modules/io");


var include = "resources/test1/**/*.*";
var includemd = "resources/test1/**/*.md";
var include2 = "resources/test2/**/*.*";
var exclude = "resources/test1/excluded";
var exclude2 = "resources/test2/excluded/**/*";
var includeFolder = "resources/test1";
var includeFile = "resources/test1/js3.js.md";
var less = "resources/less";


var files = io.getFiles([include,include2], {exclude:[exclude,exclude2]});
// var files = io.getFiles(include, {exclude:exclude});
// var files = io.getFiles(includeFolder);
// var files = io.getFiles(includeFile);
// var files = io.getFiles(includemd, {exclude:exclude, ignoreExtension:true});
// var files = io.getFiles(less);
console.log(files);


// console.log("Estoy en pattern", io.isInPattern("resources/test1/folder2.js.md", "resources/test1/**/*.*"));
// console.log("NO estoy en pattern", io.isInPattern("resources/test1/peter.md", "resources/test1/**/*.*"));


// Testing rimraf delte folder
// var detelePath = "resources/test3";
// io.deleteFolderRecursive(detelePath);

var output = "output/output.txt";
var data = "Text to be saved";
io.writeToDisk(output, data);