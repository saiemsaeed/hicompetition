const express = require('express'),
    router = express.Router(),
    db = require('../models/');
    helper = require('../helpers/user');
    auth = require('../middleware/auth');

router.route('')
    .get(helper.main)
    .post(helper.signUp);

router.route('/uploadAvatar')
    .get(helper.uploadAvatar)
    .post(helper.uploadAvatarPOST);

router.route('/login')
    .get(auth, helper.login)
    .post(helper.loginPOST)

router.route('/me')
    .delete(auth, helper.deleteMe);

module.exports = router;