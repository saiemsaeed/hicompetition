const db = require('../models/')


exports.main = (req, res) => {
    res.render('user/index');
};

exports.getUsers = (req, res) => {
    db.User.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
};

exports.signUp = (req, res) => {
    var body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }
    
    let user = new db.User(body);
    db.User.create(user)
    .then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        res.header('x-auth', token).send(user);
        res.redirec('/uploadAvatar');
    }) 
    .catch(err => res.send(err))
};

exports.uploadAvatar = (req, res) => {
    res.render('user/uploadAvatar');
}

exports.getMe = (req, res) => {
    res.send(req.user);
};

module.exports = exports;