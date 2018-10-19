<p align='center'>
<img src='https://vimlet.com/resources/img/commons-txt.png' title='Vimlet Commons' alt='Vimlet Commons'>
</p>

## Provides a cross environment standardized API for common used functions.
This module is a constant effort of improvement to achieve a stable and flexible, free open-source solution, for common case developing needs.

**Currently supporting:**

OS
Run
Request
Compress
Util
Progress
You can access the source code at [vimlet/commons](https://github.com/vimlet/vimlet-commons)

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

To view the documentation page click [here](https://vimlet.com/vimlet/vimlet-commons/master/docs/release/index.html)

## License
This project is under MIT License. See [LICENSE](https://github.com/vimlet/vimlet-commons/blob/master/LICENSE) for details.

