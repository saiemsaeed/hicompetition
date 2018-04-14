const db = require('../models/');
let auth = (req, res, next) => {
    let token = req.cookies.hitoken;
    if (!token) {
        next();
    }
    else {
        db.User.findByToken(token)
            .then(user => {
                if (!user) {
                    res.send("404");
                }
                req.user = user;
                req.token = token;
                next();
            })
            .catch((err) => res.status(401).send(err))
    }
};

module.exports = auth;