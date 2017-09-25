var commons = require("../release");

// commons.os.setUserEnvironmentVariable("test", "hi");
commons.os.addToUserPath("C:\\TEST", function(){
    console.log("Done!");
});