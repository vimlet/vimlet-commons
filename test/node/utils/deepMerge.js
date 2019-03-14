var fs = require("fs-extra");
var utils = require("../../../src/node/modules/utils");


var json1 = fs.readJsonSync("resources/json1.json");
var json2 = fs.readJsonSync("resources/json2.json");



console.log(utils.json.deepMerge(json1,json2));

