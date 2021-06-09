const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require('../models/user');
var keys = require("../config/keys");

const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = keys.secret;

module.exports = passport => {
    passport.use(
      new JwtStrategy(opt, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })

    );
};