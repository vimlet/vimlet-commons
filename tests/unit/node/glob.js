const {
    suite,
    test
} = intern.getInterface("tdd");
const {
    assert
} = intern.getPlugin("chai");

var glob = require("../../../src/node/modules/glob");

suite("glob", () => {
  test("files", () => {      
      var patterns = ["resources/files/**.js"];
      glob.files(patterns, {
        path: __dirname
      }, function (error, result) {
         var expected = [ { match: 'resources/files/js.js',
         pattern: 'resources/files/**.js',
         file:
          'C:/Users/jpere/Documents/NetbeansProjects/vimlet-commons/tests/unit/node/resources/files/js.js' } ];
         assert.strictEqual(JSON.stringify(result), JSON.stringify(expected),
         "The expected output is: " + JSON.stringify(expected));           
      });
  });
    test("filesExclude", () => {
        var patterns = ["resources/filesExclude/**","!**/filesExclude/**.txt"];
        glob.files(patterns, {
          path: __dirname
        }, function (error, result) {
          var expected = [ { match: 'resources/filesExclude/js.js',
          pattern: 'resources/filesExclude/**',
          file:
           'C:/Users/jpere/Documents/NetbeansProjects/vimlet-commons/tests/unit/node/resources/filesExclude/js.js' } ];
           assert.strictEqual(JSON.stringify(result), JSON.stringify(expected),
           "The expected output is: " + JSON.stringify(expected));           
        });
    });
    test("match", () => {
        var paths = [ 
          "/a/b/c",
          "/a"
        ];
        var patterns = ["/a**"];
        var matches = glob.match(paths, patterns);
        var expected = [ { match: '/a/b/c', pattern: '/a**' },
        { match: '/a', pattern: '/a**' } ];
        assert.strictEqual(JSON.stringify(matches), JSON.stringify(expected),
        "The expected output is: " + JSON.stringify(expected)); 
    });
    test("matchExclude", () => {
        var paths = [
          "/a/b/c",
          "/a"
        ]; 
        var patterns = ["/a**","!/a/b**"];
        var matches = glob.match(paths, patterns);
        var expected = [ { match: '/a', pattern: '/a**' } ];        
        assert.strictEqual(JSON.stringify(matches), JSON.stringify(expected),
        "The expected output is: " + JSON.stringify(expected)); 
    });
});