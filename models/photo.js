const mongoose = require('mongoose'),
    validator = require('validator');

let photoSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        data: Buffer,
        contentType: String,
        required: true
    },
    faces: [{
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        cords: {
            x: {
                type: String
            },
            y: {
                type: String
            }
        }
    }],
    _uploader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    } 
});

module.exports = mongoose.model('Photo', photoSchema);