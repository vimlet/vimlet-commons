var commons = require("../../src/node/commons");
var path = require("path");

var url = "https://nodejs.org/dist/v6.11.3/node-v6.11.3-x64.msi";
var file = path.join(__dirname, "resources/request/file");

commons.request.download(url, file, function (receivedBytes, totalBytes, statusCode) {
    // console.log("receivedBytes: " + receivedBytes + " totalBytes: " + totalBytes + " statusCode: " + statusCode);
}, function (out) {
    process.stdout.write(out);
}, function (error) {
    // Done
});
