# Vimlet Commons Modules:

Provides a cross environment standarized API for common used functions.

- OS
- Run
- Request
- Compress
- IO
- Validation
- Serialization


## Run

**Description**:

Run commands and binarys with args.

**Depends**:
- OS

**Methods**:
- exec(String command, String[] args, String, workingDirectory, ExecHandler handler) : **void**

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
- download(String url, String file, DownloadHandler handler) : **boolean**

**Notes**:
- DownloadHandler is a callback function(received, total, done, error) on node.
