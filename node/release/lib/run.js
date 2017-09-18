var spawn = require("child_process").spawn;
var deasync = require("deasync");
var os = require("./os.js");

exports.encoding = "utf8";

exports.exec = function (command, args, workingDirectory, execHandler) {

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
  p.stdout.on("data", function (data) {

    if (execHandler) {
      execHandler(data.toString(exports.encoding));
    } else {
      console.log(data.toString(exports.encoding));
    }

  });

  p.stderr.on("data", function (data) {

    if (execHandler) {
      execHandler(null, data.toString(exports.encoding));
    } else {
      console.log(data.toString(exports.encoding));
    }

  });

  p.on("exit", function (exit) {

    // Exit code to string
    exit = exit + "";

    if (execHandler) {
      execHandler(null, null, exit);
    }

  });

};

exports.execSync = function (command, args, workingDirectory, execHandler) {

  var forceSync = true;

  exports.exec(command, args, workingDirectory, function () {

    if (out) {

      if (execHandler) {
        execHandler(out);
      } else {
        console.log(out);
      }

    }

    if (error) {

      if (execHandler) {
        execHandler(null, error);
      } else {
        console.log(error);
      }

    }

    if (exit) {

      if (execHandler) {
        execHandler(null, null, exit);
      }

      forceSync = false;

    }

  });

  while (forceSync) {
    deasync.sleep(100);
  }

};


exports.fetch = function (command, args, workingDirectory, fetchHandler) {

  var forceSync = true;
  var stringOutput = "";

  exports.exec(command, args, workingDirectory, function (out, error, exit) {

    if (out) {
      stringOutput += out;
    }

    if (error) {
      stringOutput += error;
    }

    if (exit) {
      fetchHandler(stringOutput);
    }

  });

};

exports.fetchSync = function (command, args, workingDirectory) {

  var forceSync = true;
  var stringOutput = "";

  exports.fetch(command, args, workingDirectory, function (out) {

    stringOutput += out;
    forceSync = false;

  });

  while (forceSync) {
    deasync.sleep(100);
  }

  return stringOutput;

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