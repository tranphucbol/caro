let passport = require("passport");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let User = require('../models/user')
let config = require('../config')

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret

let url = "localhost:3001";

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({username: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false,  { message: 'You must login first' });
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false,  { message: 'You must login first' });
        }
    });
}));

module.exports = passport;



