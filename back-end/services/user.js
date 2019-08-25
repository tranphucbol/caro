let User = require("../models/user");
let jwt = require("jsonwebtoken");
let config = require("../config");
let UserDTO = require("../dto/user-dto");
let rankService = require("./rank");
let roomService = require("./room");

class UserService {
    async auth(username, password) {
        let user = await User.findOne({ username: username });
        if (user) {
            let isMatch = await user.comparePassword(password);
            if (isMatch) {
                let token = jwt.sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
                        sub: username
                    },
                    config.jwtSecret
                );
                return { token, data: new UserDTO(user) };
            } else {
                return Promise.reject({
                    code: 403,
                    error: "Wrong username or password"
                });
            }
        }
    }

    async register(username, password, rePassword) {
        let user = new User({
            username: username,
            password: password,
            rePassword: rePassword,
            winningCount: 0,
            gameCount: 0,
            point: 30000,
            avatar: "/images/shocked.svg"
        });

        if (password.trim().length !== 0 && password !== rePassword) {
            return Promise.reject({
                code: 400,
                error: "Password and re-password do not match"
            });
        }

        try {
            let doc = await user.save();
            let token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
                    sub: doc.username
                },
                config.jwtSecret
            );
            return { token, data: new UserDTO(user) };
        } catch (err) {
            return Promise.reject({ code: 400, error: "username existed" });
        }
    }

    async getUserByUsername(username) {
        const user = await User.findOne({
            username: username
        });
        if (user) {
            user.rank = await rankService.getRankByUsername(username);
            return new UserDTO(user);
        } else {
            return Promise.reject({ code: 400, error: "Username not found" });
        }
    }

    async updateGame(username, point, result) {
        const user = await User.findOne({
            username
        });
        if (user) {
            user.point += point;

            if (result === 0) {
                user.winningCount++;
            }
            user.gameCount++;

            rankService.updatePointInLeaderBoard(user.username, user.point);

            await user.save();
            return user;
        } else {
            return Promise.reject({ code: 400, error: "Username not found" });
        }
    }

    async handleResult(roomId, winner) {
        try {
            let room = await roomService.getRoomById(roomId);
            if (room.status === "ROOM_WAITING")
                return Promise.reject({
                    error: "Status of room is ROOM_WAITING"
                });
            let point = parseInt(room.point);
            await this.updateGame(winner, point + 100, 0);
            console.log("inc", winner);
            let loser = winner === room.host ? room.guest : room.host;
            await this.updateGame(loser, -point);
            console.log("des", loser);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getPointAllUser() {
        let users = await User.find();
        return users.map(user => ({
            username: user.username,
            point: user.point
        }));
    }
}

module.exports = new UserService();
