var utils = require("../../../src/node/modules/utils");


utils.string.asyncReplace("Text", new RegExp("ext", "gm"), function () {
    return "ip"
}).then(function(data){
    console.log(data);    
});