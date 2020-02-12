var copy = require("../../../../../src/node/modules/copy");
var include = "resources";
var excludeFolder = "resources/exclude";
var output = "output";


// copy.copy(include, output, {exclude: excludeFolder, clean:true}, function(){
//     console.log("Done!");    
// });

async function waitCopy(){
  await copy.copy(include, output, {exclude: excludeFolder, clean:true});
  console.log("Done!");  
}
waitCopy();

// copy.copySync(include, output, {exclude: excludeFolder, clean:true});
// console.log("Done!");    

// copy.watch(include, output, {exclude: excludeFolder});