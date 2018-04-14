const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/photocalypse");

Mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Photographer = require('./photographer');