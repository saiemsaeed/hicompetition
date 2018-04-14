const db = require('../models/'),
    fs = require('fs');
exports.login = (req, res) => {
    if (req.token)
        res.render('photographer/index');
    else
        res.render('photographer/login');
}

exports.signin = (req, res) => {
    let body = {
        email: req.body.email,
        password: req.body.password
    }
    db.Photographer.findByCredentials(body.email, body.password)
        .then(photographer => {
            return photographer.generateAuthToken().then(token => {
                res.cookie('hiphotographer', token);
                res.header('x-auth', token);
                res.redirect('/photographer/');
            });
        })
        .catch(err => res.status(404).send(err));
}

exports.signup = (req, res) => {
    var newImg = fs.readFileSync('./public/images/avatar-default.jpeg');
    var encImg = newImg.toString('base64');

    var body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        avatar: Buffer(encImg, 'base64')
    }

    let photographer = new db.Photographer(body);
    db.Photographer.create(photographer)
        .then(() => photographer.generateAuthToken())
        .then((token) => {
            res.header('x-auth', token);
            res.cookie('hiphotographer', token);
            res.redirect('/');
        })
}

exports.upload = (req, res) => {
    res.json({file: req.file})
}

module.exports = exports;