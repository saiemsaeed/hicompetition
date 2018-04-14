const db = require('../models/');
let auth = (req, res, next) => {
    let token = req.cookies.hiphotographer;
    if (!token) {
        next();
    }
    else {
        db.Photographer.findByToken(token)
            .then(photographer => {
                if (!photographer) {
                    res.send("404");
                }
                req.photographer = photographer;
                req.token = token;
                next();
            })
            .catch((err) => res.status(401).send(err))
    }
};

module.exports = auth;