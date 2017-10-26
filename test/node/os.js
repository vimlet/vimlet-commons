var commons = require("../../src/node");

// commons.os.setUserEnvironmentVariable("test", "hi");
commons.os.addToUserPath("C:\\TEST", function() {
  console.log("Done!");
});
