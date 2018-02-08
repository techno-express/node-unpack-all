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
    })
    .catch(function (err) { console.log(err); }); 
} else if (process.platform == "linux") {
    const spawn = require('child_process').spawnSync;
    const system_installer = require('system-install');
    const cmd = system_installer().split(" ")[0];
    const args = [ system_installer().split(" ")[1] ];
    const install = [ system_installer().split(" ")[2] ];
    const distro = args.concat(install).concat(['-y','unar']);
    console.log('Running ' + cmd  + ' ' + distro);
    var result = spawn(cmd, distro, { stdio: 'pipe' });
    if (result.error) { console.error(result.error); }  
    if (result.stdout.toString()) { console.log(result.stdout.toString()); }    
}

function getExtractUnar(urlsource, filesource, destination){
    var node_wget = require('node-wget');
    var unzip = require('unzip');
    console.log('Downloading ' + urlsource);
  return new Promise(function (resolve, reject) {         
    node_wget({ url: urlsource, dest: filesource }, function (err) {
        if (err) { return reject('Error downloading file: ' + err); }
        var unzipfile = unzip.Extract({ path: destination });
        unzipfile.on('error', function(err) { reject(err); });
        unzipfile.on('close', function() { resolve(); });
        fs.createReadStream(filesource).pipe(unzipfile);     
    });        
  });
} 

