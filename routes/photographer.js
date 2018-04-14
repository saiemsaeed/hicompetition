const express = require('express'),
    router = express.Router(),
    db = require('../models/');
    helper = require('../helpers/photographer'),
    auth = require('../middleware/authPhotographer'),
    upload = require('../middleware/upload');

router.route('/')
    .get(auth, helper.login)
    .post(helper.signin);

router.route('/new')
    .post(helper.signup);

router.route('/upload', upload.single('file'))
    .post(helper.upload);


module.exports = router;