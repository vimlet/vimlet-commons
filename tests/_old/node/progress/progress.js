var progress = require("../../../src/node/modules/progress");

var progressHandler = progress.progressHandler(100);
progressHandler.showProgressChange(10);
