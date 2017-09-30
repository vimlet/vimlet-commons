var commons = require("../release");

// commons.run.exec("dir", "/a");

commons.run.exec("ping", ["8.8.8.8"], null, function(out) {
  process.stdout.write(out);
});
