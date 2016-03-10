"use strict";

var through = require('through');
var styleParser = require('react-styling').default;

var isStyle = /\.(css|style|radium)$/;

module.exports = function (filename) {
    if (!isStyle.exec(filename)) return through();

    var buffer = '';
    return through(
        function (chunk) {
            buffer += chunk;
        },
        function () {
            var jsonStyle = styleParser(buffer);
            this.queue('module.exports = ' + JSON.stringify(jsonStyle) + ';');
            this.queue(null);
        });
};