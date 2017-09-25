# Vimlet Commons

### Provides a cross environment standardized API for common used functions. 

This module is a constant effort of improvement to achieve a stable and flexible, free open-source solution, for common case developing needs.

**Currently supporting**:

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

var pack = require("path").join(__dirname, "resources/compress/pack");
var out = require("path").join(__dirname, "resources/compress/file.zip");

commons.compress.pack(pack, out, "zip", null, function(error) {
    if(error) {
        console.log("Fail");
    } else {
        console.log("Success");
    }
});

```

# API

This is a simplified API documentation where types are provided to ease the usage, note [opt] denotes optional or nullable parameters.

**Notes:**
- All async methods parameters ends with a standard node callback(error, data), this means promises and other synchronization methods should be compatible out of the box.
- In most functions, when a null output callback is provided, console output will be the default, this is useful for overriding text output.

## Run

**Description**:

Run commands and binaries with args.

**Depends**:

- OS

**Methods**:

- **exec**(String command, String[] args, String workingDirectory, ExecHandler handler[opt], DoneHandler handler[opt]) : void
- **fetch**(String command, String[] args, String workingDirectory, DoneHandler handler[opt]) : void

**Notes**:

- ExecHandler is an output callback function(out, error).
- DoneHandler is a standard node callback function(error, exitCode).

## OS

**Description**:

Detects platform, architecture and handle os specific operations.

**Methods**:

- **isWindows**() : boolean
- **isLinux**() : boolean
- **isMac**() : boolean
- **is64Bit**() : boolean
- **getUnixUserProfile**() : String
- **setUserEnvironmentVariable**(String key, String value) : void
- **addToUserPath**(String value) : void
- **killProcessByName**(String name) : void

## Request

**Description**:

Handle http requests and download files.

**Methods**:

- **download**(String url, String file, DownloadHandler handler[opt], DoneHandler handler[opt]) : String

**Notes**:

- DownloadHandler is an output callback function(received, total, statusCode).
- DoneHandler is a standard node callback function(error, statusCode).

## Compress

**Description**:

Packs and unpacks files and directories for the following formats:
- zip
- tar
- tgz

**Depends**:

- Util


**Methods**:

- **pack**(String file, String dest, String format, PackHandler handler[opt],  DoneHandler handler[opt]) : void
- **unpack**(String file, String dest, String format, UnpackHandler handler[opt],  DoneHandler handler[opt]) : void

**Notes**:

- Format must exactly match one of these "zip", "tar", "tgz".
- PackHandler is an output callback function(error, entry, entrySize, totalSize, totalCount).
- UnpackHandler is an output callback function(error, entry, entrySize, totalSize, totalCount).
- DoneHandler is a standard node callback function(error).

--------------------------------------------------------------------------

## License 
This project is licensed under [FreeBSD 2 clause license](https://spdx.org/licenses/BSD-2-Clause-FreeBSD.html#licenseText)

## Documentation
Documentation is an ongoing effort, hopefully it will get better and better over time, feel free to open 
[github issues](https://github.com/vimlet/VimletCommons) anytime, we will try to resolve any doubts or issues you might have.

## Issues
Please report issues at [github issues](https://github.com/vimlet/VimletCommons):

**Known issues**
- Run module should provide a more flexible encoding capabilities.
