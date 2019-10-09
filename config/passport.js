//middleware
const mongoose = require('mongoose'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
//model
const User = require('../model/user');
// config
const Keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User
                .findById(jwt_payload.id) //getting the user
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
