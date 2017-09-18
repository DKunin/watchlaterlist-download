'use strict';

var fs = require('fs');
var del = require('del');
var express = require('express');
var app = express();
var PORT = 1999;

app.use(express.static('./public'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    var files = fs.readdirSync('./public/videos').filter(function(singleFile) {
        return singleFile.indexOf('mp4') !== -1;
    });
    res.render('index', { files: files });
});

app.get('/videos/:name', function(req, res) {
    res.render('video', { videoname: req.params.name });
});

app.get('/remove/:name', function(req, res) {
    del(['./public/videos/' + req.params.name]).then(function(paths) {
        res.send('Deleted files and folders:\n' + paths.join('\n'));
    });
});

app.listen(PORT);
