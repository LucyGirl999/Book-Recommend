// const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require("./keys")
const mongoose = require('mongoose')
const User = mongoose.model("users")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
        console.log(jwt_payload);

        // 通过jwt——payload查询用户id下的内容，并返回用户信息
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err => console.log(err))
    }))
}