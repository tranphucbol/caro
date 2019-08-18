let User = require("../models/user");
let jwt = require('jsonwebtoken')
let config = require('../config')

module.exports = class UserService {
    async auth(username, password) {
        let user = await User.findOne({ username: username });
        let isMatch = await user.comparePassword(password);
        if (user && isMatch) {
            let token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    sub: username
                },
                config.jwtSecret
            );
            return {token}
        } else {
            throw {code: 403, error: "Wrong username or password"}
        }
    }

    async register(username, password, rePassword) {
        let user = new User({
            username: username,
            password: password,
            rePassword: rePassword,
            winningCount: 0,
            gameCount: 0,
            point: 30000
        })
    
        if(password.trim().length !== 0 && password !== rePassword) {
            throw {code: 400, error: 'Password and re-password do not match'}
        }
    
        try {
            let doc = await user.save()
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                sub: doc.username
            }, config.jwtSecret);
            return {token}
        } catch (err) {
            console.log(err)
            throw {code: 400, error: 'username existed'}
        }
    }

    async getUserByUsername(username) {
        const user = await User.findOne({
            username: username
        })
        if(user) {
            return user
        } else {
            throw {code: 400, error: "Username not found"}
        }
    }
}
