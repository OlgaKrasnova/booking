const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

//Защита роутов через passport.js
module.exports = passport => {
    passport.use(
        //Выбор стратегии
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await (await User.findById(payload.userId)).isSelected('email id')
                if(user){
                    //Пользователь найден
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}