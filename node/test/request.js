var vimlet_commons = require("../release");
var path = require("path");

var url = "https://nodejs.org/dist/v6.11.3/node-v6.11.3-x64.msi";
var file = path.join(__dirname, "resources/request/file");

vimlet_commons.request.downloadSync(url, file);
console.log("In sync mode this message should appear last!");
