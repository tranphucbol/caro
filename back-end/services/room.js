const uuidv1 = require("uuid/v1");
const redisClient = require("../redis");

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

    async joinRoom(roomId, user) {
        try {
            const roomKey = `room:${roomId}`;
            const room = await this.getRoomById(roomId);

            if (user.point < room.point) {
                return Promise.reject({ error: "Your point is not enough" });
            }
            if (redisClient.hsetnxAsync(roomKey, "guest", user.username)) {
                return room;
            } else {
                return Promise.reject({ error: "Room is full" });
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async quitRoom(roomId, username) {
        try {
            const roomKey = `room:${roomId}`; 
            const room = await this.getRoomById(roomId);
            if(room.host === username) {
                if(room.guest === undefined) {
                    redisClient.del(roomKey);
                } else {
                    room.host = room.guest;
                    redisClient.hdel(roomKey, 'guest')
                }
            } else if (room.guest === username) {
                redisClient.hdel(roomKey, 'guest')
            } else {
                Promise.reject({error: 'User is not room'})
            }
        } catch(err) {
            return Promise.reject(err)
        }
       
    }

    async getRoomById(roomId) {
        const roomKey = `room:${roomId}`;
        const room = await redisClient.hgetallAsync(roomKey);

        if (room === {}) {
            return Promise.reject({ error: "Room not found" });
        }
        return room;
    }

    async getValidGame(roomId, username) {
        try {
            const room = await this.getRoomById(roomId);
            console.log(room);

            if (room.host === username) {
                if ("guest" in room) {
                    return room;
                }
                return Promise.reject({ error: "The room is not enough" });
            } else {
                return Promise.reject({ error: "You are not host" });
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

module.exports = new Room();