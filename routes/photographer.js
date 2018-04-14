const express = require('express'),
    router = express.Router(),
    db = require('../models/');
    helper = require('../helpers/photographer');

router.route('/')
    .get(helper.main);

module.exports = router;