const uuidv1 = require("uuid/v1");
const redisClient = require("../redis");
const userService = require("./user");

class Room {
    createRoom({ username, pet, name }) {
        const roomId = uuidv1();
        const roomKey = `room:${roomId}`;
        redisClient.hmset(roomKey, {
            roomId: roomId,
            host: username,
            name,
            point: pet,
            hostWin: 0,
            guestWin: 0
        });
        return {
            roomId: roomId,
            name,
            point: pet,
            hostWin: 0,
            guestWin: 0
        };
    }

    async joinRoom(roomId, username) {
        const roomKey = `room:${roomId}`;
        const existed = await redisClient.existsAsync(roomKey);
        const point = await redisClient.hget(roomKey, "point");
        const user = await userService.getUserByUsername(username);

        if (existed) {
            if(user.point < point) {
                return Promise.reject({error: "Your point is not enough"})
            }
            return redisClient.hsetnxAsync(roomKey, "guest", username);
        } else {
            return Promise.reject({error: "Room does not exist"})
        }
        return false;
    }

    async getValidGame(roomId, username) {
        const roomKey = `room:${roomId}`;
        const room = await redisClient.hgetallAsync(roomKey);

        if(room === {}) {
            return Promise.reject({error: "Room not found"})
        }

        if (room.host === username) {
            if ("guest" in room) {
                return room;
            }
            return Promise.reject({error: "The room is not enough"});
        } else {
            return Promise.reject({error: "You are not host"});
        }
    }
}

module.exports = new Room();
