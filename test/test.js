'use strict';

var expect = require('expect.js');
var concat = require('concat-stream');
var test = require('tape');
var fs = require('fs');
var path = require('path');
var stylerify = require('../');
var browserify = require('browserify');
var through = require('through');


function checkBrowserify(expectedFile, projectFile, t){
    var buffer = '';

    var config = {
        transform: [
            stylerify
        ]
    };

    var expected = fs.readFileSync(expectedFile, 'utf8').replace(/\s+/g, '');
    var b = browserify(path.join(__dirname, projectFile), config);

    b.bundle().pipe(through(
        function (chunk) {
            buffer += chunk;
        },
        function () {
            buffer = buffer.replace(/\s+/g, '');
            expect(buffer).to.contain(expected);
            t.end();
        }));
}

test('stylerify exports a function', function (t) {
    expect(stylerify).to.be.an('function');
    t.end();
});

test('return a through stream', function (t) {
    expect(stylerify().constructor.name).to.be.equal('Stream');
    t.end();
});


test('check browserify with radium extension', function (t) {
    checkBrowserify(
        'fixtures/expected/compiled.js',
        'fixtures/source/import.radium.js',
        t
    );
});

test('check browserify with css extension', function (t) {
    checkBrowserify(
        'fixtures/expected/compiled.js',
        'fixtures/source/import.css.js',
        t
    );
});

test('check browserify with style extension', function (t) {
    checkBrowserify(
        'fixtures/expected/compiled.js',
        'fixtures/source/import.style.js',
        t
    );
});
