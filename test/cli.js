var browserify = require('browserify');
var stylerify = require('../');

var config = {
    transform: [
        stylerify
    ]
};

var b = browserify('./fixtures/source/import.js', config);
b.bundle().pipe(process.stdout);

//b.bundle().pipe(fs.createWriteStream("./bundle.js"));