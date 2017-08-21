# Vimlet Commons Modules:

Provides a cross environment standarized API for common used functions.

- OS
- Run
- IO
- Download
- Compress
- Validation
- Serialization


## Run

**Description**:

Run commands and binarys with args.

**Depends**:
- OS

**Methods**:
- exec(String command, String[] args, String, workingDirectory) : **void**

## OS

**Description**:

Detects platform and architecture.

**Methods**:
- isWindows() : **boolean**
- isLinux() : **boolean**
- isMac() : **boolean**
- is64Bit() : **boolean**
