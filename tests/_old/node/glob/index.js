var glob = require("../../../../src/node/modules/glob");;

var paths = [
  "/a/b/c.txt",
  "/a"
];
var patternsMatch = ["/a**.txt"];
var patternsFiles = ["**.js"];
var sortFiles = ["resources/sort/**.txt"];

var matches = glob.match(paths, patternsMatch);
console.dir(matches);
// var matchesNoExt = glob.match(paths, patternsMatch, {ignoreExtension:true});
// console.log("IgnoreExtension",matchesNoExt);

// glob.files(patternsFiles, {
//   path: __dirname
// }, function (error, result) {
//   console.dir(result);
// });

// glob.files(patternsFiles, {
//   path: __dirname
// }).then(function (result) {
//   console.dir(result);
// }).catch(function (error) {
//   console.log(error);
// });


// glob.files("resources/**/subfolder/build.**.js").then(data => {
//   console.log(data);
// }).catch(e => {
//   console.log("Err");
// })


// glob.files(sortFiles, {
//   path: __dirname,
//   sort:true
// }, function (error, result) {
//   // console.dir(result);
// });


// var array = [{
//     file: "a"
//   },
//   {
//     file: "d"
//   },
//   {
//     file: "c"
//   },
//   {
//     file: "b"
//   },
// ];

// function compare(a, b) {
//   if (a.file < b.file) {
//     return -1;
//   }
//   if (a.file > b.file) {
//     return 1;
//   }
//   return 0;
// }

// console.log("1", array);
// array.sort(compare);
// console.log("2", array);