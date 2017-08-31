var vimlet_commons = require("../release");
var path = require("path");

var url = "http://service.vimlet.com/vide/vide.json";
var file = path.resolve("./resources/request/file.json");

vimlet_commons.request.download(url, file);
