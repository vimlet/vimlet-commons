# Vimlet Commons

### Provides a cross environment standardized API for common used functions. 

This module is a constant effort of improvement, to achieve a stable free and open-source solution for common case developing needs, currently supporting:

- OS
- Run
- Request
- Compress
- Util
- Progress (TODO)
- IO (TODO)
- Validation (TODO)
- Serialization (TODO)

You can access the source code at [https://github.com/vimlet/VimletCommons](https://github.com/vimlet/VimletCommons)

**Basic usage**:

```
const commons = require("vimlet-commons");

// Where '*' use the desired function from the API below
commons.os.*
commons.run.*
commons.request.*
commons.compress.*

// Examples, note in most cases the API has async
// and sync version of the same function and that
// callbacks are optional

var pack = require("path").join(__dirname, "resources/compress/pack");
var out = require("path").join(__dirname, "resources/compress/file.zip");

// Async, when null handler is provided console output will be the default
commons.compress.pack(pack, out, "zip", null, function(success){
    console.log("Success: " + success);
});

// Sync
commons.compress.packSync(pack, out, "zip");

```

Notes:
- In most functions, when null handler is provided console output will be the default, this is useful to override text output.

# API

This is a simplified API documentation where types are provided to ease the usage, note [opt] denotes optional or nullable parameters.

## Run

**Description**:

Run commands and binaries with args.

**Depends**:
- OS

**Methods**:
- exec(String command, String[] args, String workingDirectory, ExecHandler handler[opt], DoneHandler handler[opt]) : **void**
- execSync(String command, String[] args, String workingDirectory, ExecHandler handler[opt]) : **String**
- fetch(String command, String[] args, String workingDirectory, DoneHandler handler[opt]) : **void**
- fetchSync(String command, String[] args, String workingDirectory) : **String**

**Notes**:
- ExecHandler is a callback function(out, error).
- DoneHandler is a callback function(exitCode).

## OS

**Description**:

Detects platform and architecture.

**Methods**:
- isWindows() : **boolean**
- isLinux() : **boolean**
- isMac() : **boolean**
- is64Bit() : **boolean**
- getUnixUserProfile() : **String**
- setUserEnvironmentVariable(String key, String value) : **void**
- addToUserPath(value) : **void**
- killProcessByName(name) : **void**

## Request

**Description**:

Handle http requests and download files.

**Methods**:
- download(String url, String file, DownloadHandler handler[opt], DoneHandler handler[opt]) : **boolean**
- downloadSync(String url, String file, DownloadHandler handler[opt]) : **String**

**Notes**:
- DownloadHandler is a callback function(received, total, statusCode).
- DoneHandler is a callback function(statusCode).

## Compress

**Description**:

**Depends**:
- Util

Packs and unpacks files and directories for the following formats:
- zip
- tar
- tgz

**Methods**:
- pack(String file, String dest, String format, PackHandler handler[opt],  DoneHandler handler[opt]) : **void**
- packSync(String file, String dest, String format, PackHandler handler[opt]) : **String**
- unpack(String file, String dest, String format, UnpackHandler handler[opt],  DoneHandler handler[opt]) : **void**
- unpackSync(String file, String dest, String format, UnpackHandler handler[opt]) : **String**

**Notes**:
- Format must exactly match one of these "zip", "tar", "tgz".
- PackHandler is a callback function(error, entry, entrySize, totalSize, totalCount).
- UnpackHandler is a callback function(error, entry, entrySize, totalSize, totalCount).
- DoneHandler is a callback function(success).

--------------------------------------------------------------------------


## License 
This project is licensed under [FreeBSD 2 clause license](https://spdx.org/licenses/BSD-2-Clause-FreeBSD.html#licenseText)

## Documentation
Documentation is an ongoing effort, hopefully it will get better and better over time, feel free to open 
[github issues](https://github.com/vimlet/VimletCommons) anytime, will try to resolve any doubts or issues you might have.

## Known issues
- Since we currently use "deasync" for sync functions some users might experience errors with different v8 versions, for example some error might occur when running under Electron. We are working on a replacement of "deasync" to solve this issue.

Please report issues at [github issues](https://github.com/vimlet/VimletCommons):
