var spawn = require("child_process").spawn;
var os = require("./os.js");

function runCommand(command, args, workingDirectory, execHandler) {

  var config = {
    encoding: "utf8"
  };

  if(workingDirectory){
    config.cwd = workingDirectory;
  }

  var p = spawn(command, args, config);

  return p;

}

exports.exec = function (command, args, workingDirectory, execHandler) {

  var p;

  if(os.isWindows()){

    var winArgs = ["/C", command];

    if(args) {
      winArgs.concat(args);
    }

    p = runCommand("cmd", winArgs, workingDirectory);

  } else {
    p = runCommand(command, args, workingDirectory);
  }

  // Register spawn execHandlers
  p.stdout.on("data", function (data) {

    if(execHandler) {
      execHandler(data.toString());
    } else {
      console.log(data.toString());
    }

  });

  p.stderr.on("data", function (data) {

    if(execHandler) {
      execHandler(null, data.toString());
    } else {
      console.log(data.toString());
    }

  });

  p.on("exit", function (exit) {

    if(execHandler) {
      execHandler(null, null, exit);
    }

  });


};
