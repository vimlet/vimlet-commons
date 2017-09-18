var spawn = require("child_process").spawn;
var deasync = require("deasync");
var os = require("./os.js");

exports.encoding = "utf8";

exports.exec = function (command, args, workingDirectory, execHandler, doneHandler) {

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

    if (doneHandler) {
      doneHandler(exit);
    }

  });

};

exports.execSync = function (command, args, workingDirectory, execHandler) {

  var forceSync = true;

  exports.exec(command, args, workingDirectory, execHandler, function () {
    forceSync = false;
  });

  while (forceSync) {
    deasync.sleep(100);
  }

};


exports.fetch = function (command, args, workingDirectory, doneHandler) {

  var forceSync = true;
  var stringOutput = "";

  exports.exec(command, args, workingDirectory, function () {

    forceSync = false;

    if (doneHandler) {
      doneHandler(stringOutput);
    }

  }, function (out, error) {

    if (out) {
      stringOutput += out;
    }

    if (error) {
      stringOutput += error;
    }

  });

};

exports.fetchSync = function (command, args, workingDirectory) {

  var forceSync = true;
  var stringOutput = "";

  exports.fetch(command, args, workingDirectory, function (out) {

    stringOutput = out;
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