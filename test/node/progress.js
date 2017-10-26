var commons = require("../../src/node");

var progressHandler = commons.progress.progressHandler(100);
progressHandler.showProgressChange(10);
