var os = require("os");
var path = require("path");
var fs = require("fs-extra");
var run = require("./run.js");

// Platform variables
exports.linuxUserProfile = path.join(os.homedir(), ".profile");
exports.macUserProfile = path.join(os.homedir(), ".bash_profile");

// Platform binaries
var windowsEnvironment = path.join(
  __dirname,
  "platform/windows_environment.exe"
);

exports.isWindows = function() {
  return os.platform() === "win32";
};

exports.isLinux = function() {
  return os.platform() === "linux";
};

exports.isMac = function() {
  return os.platform() === "darwin";
};

exports.is64Bit = function() {
  return (
    process.arch === "x64" ||
    process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
  );
};

exports.getUnixUserProfile = function() {
  if (exports.isWindows()) {
    return null;
  } else {
    return exports.isMac() ? exports.macUserProfile : exports.linuxUserProfile;
  }
};

exports.setUserEnvironmentVariable = function(key, value, callback) {
  // Check os
  if (exports.isWindows()) {
    run.exec(
      windowsEnvironment,
      ["setUserEnvironmentVariable", key, value],
      null,
      null,
      callback
    );
  } else {
    // Unix profile file
    var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

    // Write user variable
    if (profileContent.includes(key)) {
      // Erase existing variable
      profileContent = profileContent.replace(
        new RegExp(key + ".*"),
        key + "=" + '"' + value + '"'
      );
    } else {
      profileContent += key + "=" + '"' + value + '"' + "\n";
    }

    // Overwrite file with updated content
    fs.writeFileSync(exports.getUnixUserProfile(), profileContent, "utf8");

    // Call export
    var args = key + '="' + value + '"';

    callback();
  }
};

exports.addToUserPath = function(value, callback) {
  if (exports.isWindows()) {
    run.fetch(
      windowsEnvironment,
      ["getUserEnvironmentVariable", "Path"],
      null,
      function(error, userPath) {
        if (error) {
          callback(error);
        } else {
          userPath = userPath.trim();

          // Only add if does not exist
          if (!isInWindowsPath(userPath, value)) {
            if (userPath != "") {
              if (userPath.endsWith(";")) {
                value = userPath + value;
              } else {
                value = userPath + ";" + value;
              }
            }

            // Run windows command
            run.exec(
              windowsEnvironment,
              ["setUserEnvironmentVariable", "Path", value],
              null,
              null,
              callback
            );
          } else {
            callback();
          }
        }
      }
    );
  } else {
    // Unix profile file
    var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

    // Only add if does not exist, case sensitive check
    if (!profileContent.includes("PATH=" + '"' + value + ":$PATH" + '"')) {
      fs.appendFileSync(
        exports.getUnixUserProfile(),
        "PATH=" + '"' + value + ":$PATH" + '"' + "\n",
        "utf8"
      );
    }

    callback();
  }
};

exports.killProcessByName = function(name, execHandler, callback) {
  var command;
  var args;

  // TODO - COMMONS - Run output bug
  if (exports.isWindows()) {
    command = "taskkill";
    args = ["/f", "/im", name + "*"];
  } else {
    command = "killall";
    args = [name];
  }

  // Execute command
  run.exec(command, args, null, execHandler, callback);
};

exports.createSymlink = function(dest, src, execHandler, callback) {

  // Windows symbolic link
  if (exports.isWindows()) {
    
    var command = "mklink";
    var args = ["/h", dest, src];

    // Check file type
    if (fs.lstatSync(src).isDirectory()) {
      args[0] = "/j";
    }
    
    run.exec(command, args, null, execHandler, callback);

  } else {
    // UNIX symbolic link
    fs.ensureSymlinkSync(src, dest);
  }
  
};

function isInWindowsPath(windowsPath, value) {
  windowsPath = windowsPath.toLowerCase();
  value = value.toLowerCase();

  if (!windowsPath.includes(";")) {
    return windowsPath == value;
  }

  var pathValues = windowsPath.split(";");
  var element;

  value = value.toLowerCase();

  for (var index = 0; index < pathValues.length; index++) {
    element = pathValues[index].toLowerCase();

    if (element == value) {
      return true;
      break;
    }
  }

  return false;
}
