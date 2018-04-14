const fs = require('fs'),
    multer = require('multer'),
    crypto = require('crypto'),
    Grid = require('gridfs-stream'),
    path = require('path'),
    GridFsStorage = require('multer-gridfs-storage'),
    mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost:27017/photocalypse');

conn.once('open', function () {
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
})

var storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/photocalypse',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'photos'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

module.exports = upload;