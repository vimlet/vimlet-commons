var spawn = require("child_process").spawn;
var os = require(__dirname +"/os.js")

function runCommand(command, args, workingDirectory) {

  var config = {
    encoding: "utf8"
  };

  if(workingDirectory){
    config.cwd = workingDirectory;
  }

  var p = spawn(command, args, config);

  // Register spawn callbacks
  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  p.stderr.on("data", function (data) {
    console.log(data.toString());
  });


  return p;

}

exports.exec = function (command, args, workingDirectory) {

  var cmd;

  if(os.isWindows()){

    var winArgs = ["/C", command];

    if(args) {
      winArgs.concat(args);
    }

    cmd = runCommand("cmd", winArgs, workingDirectory);

  } else {
    cmd = runCommand(command, args, workingDirectory);
  }

};
