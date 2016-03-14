var browserify = require('browserify');
var stylerify = require('../');
var path = require('path');

var config = {
    transform: [
        stylerify
    ]
};

var b = browserify(path.join(__dirname, 'fixtures/source/import.css.js'), config);
b.bundle().pipe(process.stdout);

//b.bundle().pipe(fs.createWriteStream("./bundle.js"));