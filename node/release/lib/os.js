var os = require("os");
var path = require("path");
var fs = require("fs-extra");
var run = require("./run.js");

// Platform variables
exports.linuxUserProfile = path.join(os.homedir(), ".profile");
exports.macUserProfile = path.join(os.homedir(), ".bash_profile");

// Platform binaries
var windowsEnvironment = path.join(__dirname, "platform/windows_environment.exe");

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
  if (exports.isWindows()) {
    return null;
  } else {
    return exports.isMac() ? exports.macUserProfile : exports.linuxUserProfile;
  }
};

exports.setUserEnvironmentVariable = function (key, value) {

  try {

    // Check os
    if (exports.isWindows()) {

      run.exec(windowsEnvironment, ["setUserEnvironmentVariable " + key + " " + value], global.bar.workingDirectory);

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

    }

  } catch (e) {
    // Do nothing
  }

};

exports.addToUserPath = function (path) {

  try {

    if (exports.isWindows()) {

      var userPath = run.fetch(windowsEnvironment, "getUserEnvironmentVariable Path");
      // Run windows command
      run.exec(windowsEnvironment, "setUserEnvironmentVariable Path " + userPath + ";" + path, global.bar.workingDirectory);

    } else {

      // Unix profile file
      var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

      // Check path on user environment PATH variable
      if (!profileContent.includes("PATH=" + '"' + path + ":$PATH" + '"')) {
        fs.appendFileSync(exports.getUnixUserProfile(), "PATH=" + '"' + path + ":$PATH" + '"' + "\n", "utf8");
      }

    }

  } catch (e) {
    // Do nothing
  }

};

exports.killProcess = function (name) {

  // try {

  //   // TODO - COMMONS - Run output bug
  //   if (exports.isWindows()) {

  //     command = "taskkill";
  //     args = ["/f", "/im", name + "*", ">nul 2>&1"];

  //     // Execute command
  //     commons.run.exec(command, args, global.var.workingDirectory);

  //   } else {

  //     command = "killall";
  //     args = "/f /im " + name + "* >nul 2>&1";

  //     // Execute command
  //     commons.run.exec(command, args, global.var.workingDirectory);

  //   }

  // } catch (e) {

  // }

};

exports.removeFromUserPath = function (path) {

};