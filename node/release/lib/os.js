var os = require("os");
var path = require("path");
var fs = require("fs-extra");
var run = require("./run.js");

// Platform variables
exports.linuxUserProfile = path.resolve(os.homedir() + "/.profile");
exports.macUserProfile = path.resolve(os.homedir() + "/.bash_profile");

exports.isWindows = function () {
  return os.platform() === "win32";
};

exports.isLinux = function () {
  return os.platform() === "linux";
};

exports.isMac = function () {
  return os.platform() === "darwin";
};

exports.is64Bit = function () {
  return process.arch === "x64" || process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432");
};

exports.getUnixUserProfile = function () {
  if (exports.isWindows) {
    return null;
  } else {
    return exports.isMac() ? exports.macUserProfile : exports.linuxUserProfile;
  }
};

exports.setUserEnvironmentVariable = function (key, value) {

  try {

    // Check os
    if (exports.isWindows()) {
      // TODO - TEST ON WINDOWS
      // Run windows command
      var bin = path.resolve("windows_environment.exe");
      run.exec(bin, ["setUserEnvironmentVariable " + key + " " + value], global.bar.workingDirectory);

    } else {

      // Unix profile file
      var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

      // Write user variable
      if (profileContent.includes(key)) {

        // Erase existing variable
        profileContent = profileContent.replace(new RegExp(key + ".*"), key + "=" + '"' + value + '"');

      } else {
        profileContent += key + "=" + '"' + value + '"' + "\n";
      }
      // Overwrite file with updated content
      fs.writeFileSync(exports.getUnixUserProfile(), profileContent, "utf8");

      // Call export
      var args = key + "=\"" + value + "\"";

      // TODO - COMMONS - TEST ON LINUX
      run.exec("echo", ["test output"], null, function (out, error, exit) {
        if (error) {
          console.log("error", error);
        }
      });

    }

  } catch (e) {

  }

};

exports.addToUserPath = function (path) {

  try {

    if (exports.isWindows()) {

      // TODO - check if bin exists
      var bin = path.resolve("windows_environment.exe");

      // TODO - EXEC HANDLER callback to get user path
      // var userPath = commons.run.fetch();
      var userPath = "";

      // Run windows command
      run.exec(bin, "setUserEnvironmentVariable Path " + userPath + ";" + path, global.bar.workingDirectory);

    } else {

      // Unix profile file
      var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

      // Check path on user environment PATH variable
      if (!profileContent.includes("PATH=" + '"' + path + ":$PATH" + '"')) {
        fs.appendFileSync(exports.getUnixUserProfile(), "PATH=" + '"' + path + ":$PATH" + '"' + "\n", "utf8");
      }

    }

  } catch (e) {

  }

};

exports.killProcess = function (name) {

  try {

    // TODO - COMMONS - Run output bug
    if (exports.isWindows()) {

      command = "taskkill";
      args = "/f /im " + name + "* >nul 2>&1";

      // Execute command
      commons.run.exec(command, [args], global.var.workingDirectory);

    } else {

      command = "killall";
      args = "/f /im " + name + "* >nul 2>&1";

      // Execute command
      commons.run.exec("killall", [args], global.var.workingDirectory);

    }

  } catch (e) {

  }

};

exports.removeFromUserPath = function (path) {

  try {

    // TODO

  } catch (e) {

  }

}