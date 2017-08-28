var os = require("os");

exports.isWindows = function () {
  return os.platform() === "win32";
};

exports.isLinux = function () {
  return os.platform() === "linux";
};

exports.isMac = function () {
  return os.platform() === "darwin";
};
exports.is64bit = function () {
  return process.arch === "x64" || process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432");
};
