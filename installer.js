#!/usr/bin/env node
'use strict'

var fs = require('fs'); 
var path = require('path');

const unarAppfile = (process.platform == "darwin") ? 'unar1.8.1.zip' : 'unar1.8.1_win.zip' ;  
const unarAppurl = 'https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/theunarchiver/';

const cwd = process.cwd();
const url = unarAppurl + unarAppfile;
const source = path.join(cwd, unarAppfile);         

if ((process.platform == "win32") || (process.platform == "darwin")) {
    getExtractUnar(url, source, cwd)
    .then(function() {
        fs.unlink(source, (err) => { if (err) console.error(err); });
        if (process.platform != "win32") {
            var chmod = ['unar', 'lsar'];
            chmod.forEach(function(s) { fs.chmodSync(path.join(cwd,s), 755) });
        }
        console.log('Unar installed successful');
    })
    .catch(function (err) { console.log(err); }); 
} else {
	const system_installer = require('system-installer').installer;
	system_installer('unar')
    .then(function() {
        console.log('Unar installed successful');
    })
    .catch(function (err) { console.error(err); }); 
}

function getExtractUnar(urlsource, filesource, destination){
    var node_wget = require("wget-improved");
    var unzip = require('unzipper');
    console.log('Downloading ' + urlsource);
  return new Promise(function (resolve, reject) { 

    let download = node_wget.download(urlsource, filesource, {});
    download.on('error', function(err) {
        console.error('Error downloading file: ' + err);
        reject(err);
    });
    download.on('end', function(output) {
        var unzipfile = unzip.Extract({ path: destination });
        unzipfile.on('error', function(err) { reject(err); });
        unzipfile.on('close', function() { resolve(); });
        fs.createReadStream(filesource).pipe(unzipfile);     
    });

  });
} 

