const express = require('express'),
    router = express.Router();

// Athuntication user router
const user = require('./user'),
    profile = require('./profile'),
    post = require('./post');

// Using these router
router.use('/user', user);
router.use('/profile', profile);
router.use('/post', post);

// exporting the router
module.exports = router;