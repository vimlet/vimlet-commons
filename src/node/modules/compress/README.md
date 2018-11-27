# Compress

Tool that pack and unpack files or folders.

## Installation

npm install @vimlet/compress

It will be also installed as a module within @vimlet/commons

## Usage

`compress.pack(file, dest, format, options)`

Compress.

* file: Source file or directory.
* dest: Destination file.
* format: Compression format (zip, tar, tgz).
* options: 
1. packHandler: Progression callback. `function(error, entry, entrySize, totalSize, totalCount)`.
2. outputHandler: Default output callback `function(out)`, redirects stdout when provided.
3. doneHandler: Default done callback `function(error, data)`.


`compress.unpack(file, dest, format, options)`

Uncompress.

* file: Source file or directory.
* dest: Destination folder.
* format: Compression format (zip, tar, tgz).
* options: 
1. unpackHandler: Progression callback. `function(error, entry, entrySize, totalSize, totalCount)`.
2. outputHandler: Default output callback `function(out)`, redirects stdout when provided.
3. doneHandler: Default done callback `function(error, data)`.

### Command mode:

* `vimlet-compress -i inlcude -o output -p`
    
    Calls pack.

* `vimlet-compress -i inlcude -o output -u`
    
    Calls unpack.

> |Params|Shorcut|Description|Default|
> |---|---|---|---|
> |--include|-i|File or folder to pack / unpack|-|
> |--output|-o|Destination file or folder|-|
> |--format|-f|'zip', 'tar' or 'tgz'|'zip'|
> |--pack|-p|Call pack function|-|
> |--unpack|-u|Call unpack function|-|
> |--help|-h|Show help|-|
* `Note that if not pack neither unpack is selected, it will pack by default.`
