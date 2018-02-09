'use strict';
var expect = require('chai').expect;
var unpack = require('../index.js').unpack;
var list = require('../index.js').list;

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
        list('????', options, function (err, files, text) {
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