"use strict";

var through = require('through');
var styleParser = require('react-styling').default;
var traverse = require('traverse');


function transform(filename) {
    if (isStyle(filename)) return through();

    var buffer = '';
    return through(
        function (chunk) {
            buffer += chunk;
        },
        function () {
            var jsonStyle = extractJsonFromStyle(buffer);
            this.queue(convertJsonToFile(jsonStyle));
            this.queue(null);
        });
}

function extractJsonFromStyle(style) {
    return styleParser(style);
}

function isStyle(filename) {
    var pattern = /\.(css|style|radium)$/;
    return (!pattern.exec(filename));
}

function filterStaticFunction(string) {
    var prefix = "function(){";
    var postfix = "}.bind(config)()";

    var regex = /" *`(.*)` *"/g;
    return string.replace(regex, prefix + "$1" + postfix);
}

function convertJsonToFile(jsonStyle) {
    var json = JSON.stringify(jsonStyle);

    json =  filterStaticFunction(json);

    return "module.exports = function (config) {"
        + "return " + json
        + "};";
}

module.exports = transform;