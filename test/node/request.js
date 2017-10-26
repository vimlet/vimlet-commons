var commons = require("../../src/node");
var path = require("path");

var url = "https://nodejs.org/dist/v6.11.3/node-v6.11.3-x64.msi";
var file = path.join(__dirname, "resources/request/file");

commons.request.download(url, file, null, function(error, data) {

    console.log("Callback!");
    
});
