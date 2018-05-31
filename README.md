[//]: # (badges)

[![license](https://vimlet.com/vimlet/VimletCommons/master/docs/readme/1527792324771/license.svg?raw=true "License")](https://github.com/vimlet/VimletCommons/blob/master/LICENSE)
![build](https://vimlet.com/vimlet/VimletCommons/master/docs/readme/1527792324771/build.svg?raw=true "Build")
![semver](https://vimlet.com/vimlet/VimletCommons/master/docs/readme/1527792324771/semver.svg?raw=true "Semver")
[![docs](https://vimlet.com/vimlet/VimletCommons/master/docs/readme/1527792324771/docs.svg?raw=true "Docs")](https://rawgit.com/vimlet/VimletCommons/master/docs/node/api/index.html)

[//]: # (badges)

# Vimlet Commons Modules:

## Provides a cross environment standardized API for common used functions.
This module is a constant effort of improvement to achieve a stable and flexible, free open-source solution, for common case developing needs.

**Currently supporting:**

OS
Run
Request
Compress
Util
Progress
You can access the source code at [vimlet/commons](https://github.com/vimlet/VimletCommons)

## Instalation:

* Via NPM: `npm install @vimlet/commons`

## Basic usage:

```javascript
const commons = require("@vimlet/commons");

var src = require("path").join(__dirname, "resources/compress/pack");
var dst = require("path").join(__dirname, "resources/compress/file.zip");

commons.compress.pack(src, dst, "zip", null, null, function(error) {
    if(error) {
        console.log("Fail");
    } else {
        console.log("Success");
    }
});
```

## Documentation
Documentation is an ongoing effort, hopefully it will get better and better over time.

To view the documentation page click [here](https://rawgit.com/vimlet/VimletCommons/master/docs/node/api/index.html)

## License
This project is under MIT License. See [LICENSE](https://github.com/vimlet/VimletCommons/blob/master/LICENSE) for details.

