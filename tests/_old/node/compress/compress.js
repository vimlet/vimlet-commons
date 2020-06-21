var compress = require("../../../../src/node/modules/compress");
var io = require("../../../../src/node/modules/io");
var path = require("path");
var fs = require("fs-extra");

// var pack = path.join(__dirname, "resources/compress/pack/**/*.*");
var pack = path.join(__dirname, "resources/compress/pack");
var unpack = path.join(__dirname, "resources/compress/unpack");
var out = path.join(__dirname, "resources/compress/compress.zip");


// compress.pack(pack, out, null,  
//   async function (error) {
//     if (!error) {
//       var files = await io.getFiles(out, null);
//       console.log("Done Compress",io.absoluteFiles(files));    

//       compress.unpack(out, unpack, null, async function (error) {
//         var files = await io.getFiles(unpack, null);
//           console.log("Done upack", io.absoluteFiles(files));
//         }
//       );
//     }
//   }
// );


async function start() {
  console.log("Launch");

  async function doLaunch() {
    await compress.pack(pack, out);
    console.log("Pack done");

    await compress.unpack(out, unpack);
    console.log("Unpack done");

  }

  await doLaunch();

  console.log("Finish");
}
start();