var io = require("../../../src/node/modules/io");


var include = "resources/test1/**/*.*";
var includemd = "resources/test1/**/*.md";
var include2 = "resources/test2/**/*.*";
var exclude = "resources/test1/excluded";
var exclude2 = "resources/test2/excluded/**/*";
var includeFolder = "resources/test1";
var includeFile = "resources/test1/js3.js.md";
var less = "resources/less";


// var output = "output/output.txt";
// var data = "Text to be saved";
// io.writeToDisk(output, data).then(function(data){
//     console.log("Written");    
// });

// setTimeout(() => {    
//     io.deleteFolderRecursive("output").then(function(data){
//         console.log("DELETE");            
//     });
// }, 1500);



var output = "output/output.txt";
var data = "Text to be saved";
io.writeToDisk(output, data).then(function (data) {
    io.getRelativeOutput("resources/test1/**/*.*", "output", "resources/test1/js3.js.md", null, function (err, data) {
        console.log("Main output folder", data);
    });
    io.getRelativeOutput("resources/test1/**/*.*", "output", "resources/test1/included/jsScratch.js.md", null, function (err, data) {
        console.log("Main output folder/included", data);
    });
});



// io.isInPattern("resources/test1/folder2.js.md", ["resources/test1/**/*.*"],null,function(err,data){
//     console.log("Estoy en pattern[]", data);
// });
// io.isInPattern("resources/test1/peter.md", ["resources/test1/**/*.*"],null).then(function(data){
//     console.log("NO estoy en pattern[]", data);
// });

// io.isInPattern("resources/test1/folder2.js.md", "resources/test1/**/*.*",null,function(err,data){
//     console.log("Estoy en pattern", data);
// });
// io.isInPattern("resources/test1/folder2.js.md", "resources/test1/**/*.*",null).then(function(data){
//     console.log("Estoy en pattern", data);
// });
// io.isInPattern("resources/test1/peter.md", "resources/test1/**/*.*",null,function(err,data){
//     console.log("NO estoy en pattern", data);
// });
// io.isInPattern("resources/test1/peter.md", "resources/test1/**/*.*",null).then(function(data){
//     console.log("NO estoy en pattern", data);
// });


// io.getFiles("resources/test1",null).then(function(data){
//     console.log(io.absoluteFiles(data));
// });

// io.getFiles("resources/test1",null).then(function(data){
//     console.log("Files ", data);
// });
// io.getFiles("resources/test1", null, function(err,data){
//     console.log("Files ", data);
// });
// io.getFiles(["resources/test1"], {ignoreExtension:true}, function(err,data){
//     console.log("Files ", data);
// });
// io.getFiles("resources/test1/**/*.*", null, function(err,data){
//     console.log("Files ", data);
// });


// io.getRootFromPattern("resources/test1/**/*.*",function(err,data){
//     console.log("Root", data);
// });

// io.getRootFromPattern("resources/test1/**/*.*").then(function(data){
//     console.log("Root", data);
// });

// async function rootFromPattern() {
//     var data = await io.getRootFromPattern("resources/test1/**/*.*");
//     console.log(data);

// }
// rootFromPattern();

// io.getRootFromPattern("resources/test1/**/*.*").then(function(data){
//     console.log("Root", data);
// });


// io.getFileSize("resources/test1/js3.js.md",function(err,data){
//     console.log("FILE ",data);    
// });
// io.getFileSize("resources/test1",function(err,data){
//     console.log("Folder ",data);    
// });


// io.isDirectory("resources/test1/js3.js.md",function(err,data){
//     console.log(data);    
// });
// io.isDirectory("resources/test1",function(err,data){
//     console.log(data);    
// });
// io.isDirectory("resources/test1/js3.js.md").then(function(data){
//     console.log(data);    
// });
// io.isDirectory("resources/test1").then(function(data){
//     console.log(data);    
// });
// async function testAwait(){
//     var data = await io.isDirectory("resources/test1");
//     console.log(data);
// }
// testAwait();