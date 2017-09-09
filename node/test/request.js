var vimlet_commons = require("../release");
var path = require("path");

var url = "https://nodejs.org/dist/v6.11.3/node-v6.11.3-x64.msi";
var file = path.resolve("./resources/request/file");

vimlet_commons.request.download(url, file);
