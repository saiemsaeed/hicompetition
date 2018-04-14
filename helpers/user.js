const db = require('../models/'),
    fs = require('fs');


exports.main = (req, res) => {
    res.render('user/index');
};

exports.getUsers = (req, res) => {
    db.User.find()
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

exports.signUp = (req, res) => {

    var newImg = fs.readFileSync('./public/images/avatar-default.jpeg');
    var encImg = newImg.toString('base64');

    var body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        avatar: Buffer(encImg, 'base64')
    }

    let user = new db.User(body);
    db.User.create(user)
        .then(() => {
            return user.generateAuthToken();
        })
        .then((token) => {
            res.cookie('hitoken', token);
            res.header('x-auth', token);
            res.redirect('/uploadAvatar');
        })
        .catch(err => res.send(err))
};

exports.uploadAvatar = (req, res) => {
    res.render('user/uploadAvatar');
}

exports.uploadAvatarPOST = (req, res) => {
    let body = {
        avatar: req.body.avatar
    }
    db.User.findOneAndUpdate({ _id: req.body.id }, body, { new: true })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch(() => res.send(err))
}


exports.login = (req, res) => {
    if (req.token)
        res.redirect('/');
    else
        res.render('user/login');
};

exports.loginPOST = (req, res) => {
    let body = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(body);
    db.User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateAuthToken().then(token => {
                res.cookie('hitoken', token);
                res.header('x-auth', token);
                res.redirect('/');
            });
        })
        .catch(err => res.status(404).send(err));
};

exports.deleteMe = (req, res) => {
    let token = req.token;
    req.user.removeToken(token)
    .then(() => {
        res.clearCookie('hitoken');
        res.redirect('/');
    })
    .catch(() => {
        res.status(400).send("Error!");
    })  
}

module.exports = exports;