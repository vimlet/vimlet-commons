# Vimlet Commons Modules:

Provides a cross environment standarized API for common used functions.

- OS
- Run
- Request
- Compress
- IO
- Validation
- Serialization
- Util


## Run

**Description**:

Run commands and binarys with args.

**Depends**:
- OS

**Methods**:
- exec(String command, String[] args, String workingDirectory, ExecHandler handler) : **void**

**Notes**:
- ExecHandler is a callback function(out, error, exit) on node.

## OS

**Description**:

Detects platform and architecture.

**Methods**:
- isWindows() : **boolean**
- isLinux() : **boolean**
- isMac() : **boolean**
- is64Bit() : **boolean**

## Request

**Description**:

Handle http requests and download files.

**Methods**:
- download(String url, String file, DownloadHandler handler[opt]) : **boolean**

**Notes**:
- DownloadHandler is a callback function(received, total, done, error) on node.

## Compress

**Description**:

**Depends**:
- Util on node

Packs and unpacks files and directories for the following formats:
- zip
- tar
- tgz

**Methods**:
- pack(String file, String out, String format, PackHandler handler[opt]) : **void**
- unpack(String file, String out, String format, UnpackHandler handler[opt]) : **void**

**Notes**:
- Format must exactly match one of these "zip", "tar", "tgz".
- TODO - PackHandler is a callback function(received, total, done, error) on node.
- TODO - UnpackHandler is a callback function(received, total, done, error) on node.
