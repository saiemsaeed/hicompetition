const express = require('express'),
    router = express.Router(),
    db = require('../models/');
    helper = require('../helpers/user');
    // auth = require('../middleware/auth');

router.route('/')
    .get(helper.main)
    .post(helper.signUp);


// router.route('/me')
//     .get(auth, helper.getMe)

module.exports = router;