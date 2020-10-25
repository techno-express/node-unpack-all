#!/usr/bin/env node

'use strict'

var fs = require('fs');
var path = require('path');

const unarAppFile = (process.platform == "darwin") ? 'unar1.8.1.zip' : 'unar1.8.1_win.zip';
const unarAppUrl = 'https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/theunarchiver/';

const cwd = process.cwd();
const url = unarAppUrl + unarAppFile;
const source = path.join(cwd, unarAppFile);

if ((process.platform == "win32") || (process.platform == "darwin")) {
    getExtractUnar(url, source, cwd)
        .then(function () {
            fs.unlink(source, (err) => {
                if (err) console.error(err);
            });
            if (process.platform != "win32") {
                var chmod = ['unar', 'lsar'];
                chmod.forEach(function (s) {
                    fs.chmodSync(path.join(cwd, s), 755)
                });
            }
            console.log('Unar installed successful');
        })
        .catch(function (err) {
            console.log(err);
        });
} else {
    const system_installer = require('system-installer').installer;
    system_installer('unar')
        .then(function () {
            console.log('Unar installed successful');
        })
        .catch(function (err) {
            console.error(err);
        });
}

function getExtractUnar(urlSource, fileSource, destination) {
    var node_wget = require("node-wget-js");
    var StreamZip = require('node-stream-zip');
    console.log('Downloading ' + urlSource);
    return new Promise(function (resolve, reject) {
        node_wget({
            url: urlSource,
            dest: fileSource
        }, function (err) {
            if (err) {
                return reject('Error downloading file: ' + err);
            }

            var unzip = new StreamZip({
                file: fileSource,
                storeEntries: true
            });

            unzip.on('ready', () => {
                unzip.extract(null, destination, (err, count) => {
                    unzip.close();
                    if (err) {
                        return reject(err);
                    }

                    return resolve(count);
                });
            });
        });
    });
}
