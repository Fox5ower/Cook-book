const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../src/models/User");
const config = require("config");

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secretOrKey");

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload: any, done: any) => {
            User.findById(jwt_payload.id)
                .then((user: any) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err: Error) => console.log(err));
        })
    );
};
