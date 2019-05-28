const {
  suite,
  test
} = intern.getInterface("tdd");
const {
  assert
} = intern.getPlugin("chai");

var glob = require("../../../src/node/modules/glob");
var watcher = require("../../../src/node/modules/watcher");
var copy = require("@vimlet/commons-copy");
var io = require("@vimlet/commons-io");
var path = require("path");
var fs = require("fs");

var basePath = path.join(__dirname, "resources/watcher");

suite("watcher", () => {
  test("add", () => {
    // Delete output folder
    io.deleteFolderRecursive(path.join(basePath, "watch/output"),
      function () {
        // Delete files which should be created after watching
        fs.unlink(path.join(basePath, "watch/created.js"), function () {
          fs.unlink(path.join(basePath, "watch/created.txt"), function () {
            var patterns = ['tests/unit/node/resources/watcher/watch/**/*.js'];
            var watch = watcher.watch(patterns, null, function (error, data) {
              // Watcher callback will copy files from watch path to output
              copy.copy(data.path, path.join(basePath, "watch/output"));
            });
            // Create a file to be watch
            fs.writeFile(path.join(basePath, "watch/created.js"), "", function () {
              // Create a file to not be under surveillance
              fs.writeFile(path.join(basePath, "watch/created.txt"), "", function () {
                setTimeout(() => {
                  glob.files("**.js", {
                    path: path.join(__dirname, "resources/watcher/watch/output")
                  }, function (error, result) {
                    var expected = [{
                        match: 'created.js',
                        pattern: '**.js',
                        file: 'C:/Users/jpere/Documents/NetbeansProjects/vimlet-commons/tests/unit/node/resources/watcher/watch/output/created.js'
                      },
                      {
                        match: 'js.js',
                        pattern: '**.js',
                        file: 'C:/Users/jpere/Documents/NetbeansProjects/vimlet-commons/tests/unit/node/resources/watcher/watch/output/js.js'
                      }
                    ];      
                    assert.strictEqual(JSON.stringify(result), JSON.stringify(expected),
                      "The expected output is: " + JSON.stringify(expected));
                    console.log();
                    console.log("For some external reason watcher never stops without timeout");
                    watch.close();
                    setTimeout(() => {
                        process.exit();
                    }, 1000);
                  });
                }, 500);
              });
            });
          });
        });
      });
  });
});