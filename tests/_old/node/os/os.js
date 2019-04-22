var os = require("../../../src/node/modules/os");

os.setUserEnvironmentVariable("test", "hi");
os.addToUserPath("C:\\TEST", function() {
  console.log("Done!");
});
