all-unpacker
=======

[![Dependencies Status][david-image]][david-url] [![Build Status][travis-image]][travis-url] [![Code coverage][coveralls-image]][coveralls-url] [![Maintainability][codeclimate-image]][codeclimate-url][![Release][npm-image]][npm-url]

> Wrapper for [unar and lsar](http://unarchiver.c3.cx/commandline) command line tool.
It allows you to unpack a lot of formats: zip, zipx, rar, 7z, tar, gzip, bzip2, lzma, cab, msi, cpio,... [complete list](http://unarchiver.c3.cx/formats)

## Installation

This package differs from fork https://github.com/krocon/node-unpack-all in that the necessary cli tool lsar and unar, will be downloaded to package directory at install time. If your host is Linux your package manager will be used to install unar onto your system. For more info see [here](http://unarchiver.c3.cx/commandline).

## Usage 
```js
var ua = require('all-unpacker');
// list only:
ua.list(archiveFile<String>, options<Object>, callback<function>)
// unpack:
ua.unpack(archiveFile<String>, options<Object>, callback<function>)
```

### Examples

#### Example: unpack file
```js
require('all-unpacker')
.unpack('test/abc.rar', {
    targetDir: 'out'
}, function(err, files, text) {
   if (err) return console.error(err);
   if (files) console.log('files', files);
   if (text) console.log('text', text);
});
```
         
#### Example: list content
```js
function cb(err, files, text) {
    if (err) return console.error(err);
    console.log('files', files);
}
require('all-unpacker').list('test/abc.rar', {}, cb);
```                    
                    
                    
### Options

Key       | Possible values        | Comment
--------- | -----------------------|-------------------------------------------------
quiet     | true/false (default)   | true will reduce logging for unpacking 
targetDir | \<String>              | The directory to write the contents of the archive to. Defaults to the current directory.
files     | \<String>              | Only unpack this list of files or directories.
forceOverwrite | true/false (default)  | if null, tmp dir will created automatically
forceDirectory | true/false/undefined  | Always create a containing directory for the contents of the unpacked archive. By default, a directory is created if there is more than one top-level file or folder. 
noDirectory | true/false/undefined     | Never create a containing directory for the contents of the unpacked archive. 
noRecursion | true/false/undefined     | Do not attempt to extract archives contained in other archives. For instance, when unpacking a .tar.gz file, only unpack the .gz file and not its contents. 
copyTime | true/false/undefined        | Copy the file modification time from the archive file to the containing directory, if one is created. 
password | \<String>                   | The password to use for decrypting protected archives. 
passwordEncoding | \<String>           | The encoding to use for the password for the archive, when it is not known. If not specified, then either the encoding given by the -encoding option or the auto-detected encoding is used. 
encoding | \<String>                   | The encoding to use for filenames in the archive, when it is not known. If not specified, the program attempts to auto-detect the encoding used. Use "help" or "list" as the argument to give 

[david-url]: https://david-dm.org/techno-express/node-unpack-all
[david-image]: http://img.shields.io/david/techno-express/node-unpack-all.svg
[travis-url]: https://travis-ci.org/techno-express/node-unpack-all
[travis-image]: http://img.shields.io/travis/techno-express/node-unpack-all.svg
[codeclimate-url]: https://codeclimate.com/github/techno-express/node-unpack-all/maintainability
[codeclimate-image]: https://api.codeclimate.com/v1/badges/0d6a0bc69a8ea29c7de9/maintainability
[coveralls-url]: https://coveralls.io/github/techno-express/node-unpack-all
[coveralls-image]: https://coveralls.io/repos/github/techno-express/node-unpack-all/badge.svg
[npm-url]: https://www.npmjs.org/package/all-unpacker
[npm-image]: http://img.shields.io/npm/v/all-unpacker.svg
