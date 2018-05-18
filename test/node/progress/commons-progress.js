var commons = require("../../src/node/commons");

var progressHandler = commons.progress.progressHandler(100);
progressHandler.showProgressChange(10);
