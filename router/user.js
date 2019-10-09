// middleware
const express = require('express'),
    gravatar = require('gravatar'),
    bcryptjs = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    router = express.Router();

// config
const key = require('../config/keys');
// models
const User = require('../model/user');
// validator imports
const validateRegisterInput = require('../validation/register'),
    validateLoginInput = require('../validation/login');


// @route	Post /user/register
// @desc	Adding new user
// @access	Public
router.post('/register', async (req, res) => {
    //check valid errors
    let { err, isValid } = validateRegisterInput(req.body);
    if (!isValid) return res.status(400).json(err);
    await User
        .findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                err.email = "Email already exists !!";
                return res.status(400).json(err);
            }
            let avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //default
            });
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => res.json('failed'));
                })
            })
        })
});

// @route	Post /user/login
// @desc	Login && Generate a token
// @access	Public
router.post('/login', async (req, res) => {
    // validating the login input
    let { err, isValid } = validateLoginInput(req.body);
    if (!isValid) return res.status(400).json(err);

    let { email, password } = req.body;
    await User
        .findOne({ email })
        .then(user => {
            //chack for mail
            if (!user) {
                err.email = "Account does not Exists !!!";
                return res.status(404).json(err);
            }
            // comparing by decrypting
            bcryptjs
                .compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        err.password = "Password Doesn't match";
                        return res.status(400).json(err);
                    }
                    else {
                        // creating payload for token
                        let payload = { id: user.id, name: user.name, avatar: user.avatar };
                        //jwtwetoken generation
                        jwt.sign(payload, key.secretKey, (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
                        });
                    }
                })

        })
});

// @route	Get /user/info
// @desc	get the current user
// @access	Private
router.get('/info', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})
module.exports = router;