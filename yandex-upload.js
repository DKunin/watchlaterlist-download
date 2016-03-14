'use strict';

var fs = require('fs');
var YandexDisk = require('yandex-disk').YandexDisk;
var disk = new YandexDisk(process.env.YADISK_USER, process.env.YADISK_PASS);
var logUpdate = require('log-update');
var files = fs.readdirSync('./public/videos').filter(function(singleFile) {
    return singleFile.indexOf('mp4') !== -1;
});

var promiseExists = function(path, originalName) {
    return new Promise(function(resolve, reject) {
        disk.exists(path, function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve({ name: originalName, exists: data });
        });
    });
};

var filterOutExisting = function(filesArray) {
    return filesArray.filter(function(singleFilaobject) {
        return singleFilaobject.exists === false;
    });
};

var singleUpload = function(nonexistentFiles) {
    disk.uploadFile('./public/videos/' + nonexistentFiles.name, 'videos/' + nonexistentFiles.name, function(err, data) {
        if (err) {
            logUpdate(err);
            return;
        }
        logUpdate(data);
    });
};

Promise
    .all(files.map(function(singleFileName) {
        return promiseExists('videos/' + singleFileName, singleFileName);
    })).then(filterOutExisting).then(function(nonexistentFiles) {
        nonexistentFiles.map(singleUpload);
    });
