[//]: # (badges)

![build](badges/build.svg?raw=true "Build")
![test](badges/test.svg?raw=true "Test")

[//]: # (badges)

# Vimlet Commons Modules:

### Provides a cross environment standardized API for common used functions. 

This module is a constant effort of improvement to achieve a stable and flexible, free open-source solution, for common case developing needs.

**Currently supporting**:

- OS
- Run
- Request
- Compress
- Util
- Progress

You can access the source code at [https://github.com/vimlet/VimletCommons](https://github.com/vimlet/VimletCommons)

**Basic usage**:

```

const commons = require("@vimlet/commons");

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

--------------------------------------------------------------------------

## Documentation
Documentation is an ongoing effort, hopefully it will get better and better over time, feel free to open 

To view the documentation page [click here!](https://rawgit.com/vimlet/VimletCommons/master/docs/node/api/index.html)

--------------------------------------------------------------------------

## License 
This project is licensed under [FreeBSD 2 clause license](https://spdx.org/licenses/BSD-2-Clause-FreeBSD.html#licenseText)

--------------------------------------------------------------------------

## Issues
Please report issues at [github issues](https://github.com/vimlet/VimletCommons):

**Known issues**
- Run module should provide a more flexible encoding capabilities.

--------------------------------------------------------------------------