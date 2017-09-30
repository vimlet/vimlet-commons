var spawn = require("child_process").spawn;
var os = require("./os.js");

exports.encoding = "utf8";

exports.exec = function(
  command,
  args,
  workingDirectory,
  execHandler,
  doneHandler
) {
  var p;

  if (os.isWindows()) {
    var winArgs = ["/C", command];

    if (args) {
      winArgs = winArgs.concat(args);
    }

    p = runCommand("cmd", winArgs, workingDirectory);
  } else {
    p = runCommand(command, args, workingDirectory);
  }

  // Register spawn execHandlers
  p.stdout.on("data", function(data) {
    if (execHandler) {
      execHandler(data.toString(exports.encoding));
    } else {
      console.log(data.toString(exports.encoding));
    }
  });

  p.stderr.on("data", function(data) {
    if (execHandler) {
      execHandler(null, data.toString(exports.encoding));
    } else {
      console.log(data.toString(exports.encoding));
    }
  });

  p.on("exit", function(exit) {
    // Exit code to string
    exit = exit + "";

    if (doneHandler) {
      doneHandler(null, exit);
    }
  });
};

exports.fetch = function(command, args, workingDirectory, doneHandler) {
  var stringOutput = "";

  exports.exec(
    command,
    args,
    workingDirectory,
    function(out, error) {
      if (out) {
        stringOutput += out;
      }

      if (error) {
        stringOutput += error;
      }
    },
    function() {
      if (doneHandler) {
        doneHandler(null, stringOutput);
      }
    }
  );
};

function runCommand(command, args, workingDirectory, execHandler) {
  var config = {
    encoding: exports.encoding
  };

  if (!args) {
    args = [];
  }

  if (workingDirectory) {
    config.cwd = workingDirectory;
  }

  var p = spawn(command, args, config);

  return p;
}
