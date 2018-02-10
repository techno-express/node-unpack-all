'use strict';
var expect = require('chai').expect;
var unpack = require('../index.js').unpack;
var list = require('../index.js').list;
var unpackonly = require('../index.js').unpackonly;

var archive = 'test/attr.7z';
var options = {
        targetDir : 'tmp',
        indexes : [0],
        forceOverwrite: true,
        noDirectory: true,
        quiet: false
    }

describe('Method: `list`', function () {
    it('should return an error on lsar error', function (done) {
        list('??', options, function (err, files, text) {
            if (err) expect(err).to.be.an.instanceof(Error);
            done();
        });
    });
    
    it('should return list of files by index', function (done) {
        list(archive, options, function (err, files, text) {
            if (files) expect(files[options.indexes]).to.be.a('string');
            done();
        });
    });
});

describe('Method: `unpack`', function () {
    
    it('should return an error on unar error', function (done) {
        unpack('???', options, function (err, files, text) {
            if (err) expect(err).to.be.an.instanceof(Error);
            done();
        });
    });
           
    it('should output each file extracted', function (done) {
        unpack(archive, {
        targetDir : 'tmp',
        forceOverwrite: true,
        noDirectory: true,
        quiet: false
    }, function (err, files, text) {
            if (files) expect(files).to.be.a('string');
            done();
        });
    }); 
        
    it('should return output on fulfill', function (done) {
        unpack(archive, {
        targetDir : 'tmp',
        forceOverwrite: true,
        noDirectory: true,
        quiet: false
    }, function (err, files, text) {
            if (text) expect(text).to.be.a('string');
            done();
        });
    });
});

describe('Method: `unpackonly`', function () {
    
    it('should return an error on if missing target directory', function (done) {
        unpackonly(archive, null, ['normal file.txt','read-only file.txt'], { quiet: false }, function (err, files, text) {
            if (err) expect(err).to.be.an.instanceof(Error);
            done();
        });
    });
	
    it('should return an error on if missing file or directory to unpack', function (done) {
        unpackonly(archive, 'tmp', null, { quiet: false }, function (err, files, text) {
            if (err) expect(err).to.be.an.instanceof(Error);
            done();
        });
    });
           
    it('should not output any other file that suppplied', function (done) {
        unpackonly(archive, 'tmp', ['normal file.txt','read-only file.txt'], { quiet: false }, function (err, files, text) {
            if (files) expect(files).to.not.contain('system file.txt')
            done();
        });
    }); 
	
	it('should output only files suppplied', function (done) {
        unpackonly(archive, 'tmp', ['normal file.txt','read-only file.txt'], { quiet: false }, function (err, files, text) {
            if (files) expect(files).to.have.string('normal file.txt')
            done();
        });
    }); 
        
    it('should return output on fulfill', function (done) {
        unpackonly(archive, 'tmp', ['normal file.txt','read-only file.txt'], { quiet: false }, function (err, files, text) {
            if (text) expect(text).to.be.a('string');
            done();
        });
    });
});