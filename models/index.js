const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/photocalypse");

mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Photographer = require('./photographer');
module.exports.Photo = require('./photo');