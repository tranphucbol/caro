const uuidv1 = require("uuid/v1");
const redisClient = require("../redis");

const ROOM_PLAYING = "ROOM_PLAYING";
const ROOM_WAITING = "ROOM_WAITING";

const roomPollingService = require("./room-polling")

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
            guestWin: 0,
            status: ROOM_WAITING
        });
        roomPollingService.setRoomPolling(roomId, 'UPDATE')
        return {
            roomId: roomId,
            name,
            point: pet,
            hostWin: 0,
            guestWin: 0,
            status: ROOM_WAITING
        };
    }

    async joinRoom(roomId, user) {
        try {
            const roomKey = `room:${roomId}`;
            const room = await this.getRoomById(roomId);

            if (user.point < room.point) {
                return Promise.reject({ error: "Your point is not enough" });
            }
            const empty = await redisClient.hsetnxAsync(roomKey, "guest", user.username)
            // console.log(existed)
            if (empty) {
                roomPollingService.setRoomPolling(roomId, 'DELETE')
                return room;
            } else {
                return Promise.reject({ error: "Room is full" });
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    changeStatus(roomId, status) {
        const roomKey = `room:${roomId}`;
        redisClient.hset(roomKey, "status", status);
    }

    async quitRoom(roomId, username) {
        try {
            const roomKey = `room:${roomId}`;
            const room = await this.getRoomById(roomId);
            if (room.host === username) {
                if (room.guest === undefined) {
                    redisClient.del(roomKey);
                    roomPollingService.setRoomPolling(roomId, 'DELETE')
                } else {
                    redisClient.hset(roomKey, "host", room.guest);
                    redisClient.hdel(roomKey, "guest");
                    redisClient.hset(roomKey, "status", ROOM_WAITING);
                    roomPollingService.setRoomPolling(roomId, 'UPDATE')
                }
            } else if (room.guest === username) {
                redisClient.hdel(roomKey, "guest");
                redisClient.hset(roomKey, "status", ROOM_WAITING);
                roomPollingService.setRoomPolling(roomId, 'UPDATE')
            } else {
                return Promise.reject({ error: "User is not room" });
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getRoomById(roomId) {
        const roomKey = `room:${roomId}`;
        const room = await redisClient.hgetallAsync(roomKey);

        if (room === {} || room === null) {
            return Promise.reject({ error: "Room not found" });
        }
        return room;
    }

    async getAllRooms() {
        const roomKeys = await redisClient.keysAsync('room:*')
        const promises = roomKeys.map(roomKey => redisClient.hgetallAsync(roomKey))
        return Promise.all(promises)
    }

    async getValidGame(roomId, username) {
        try {
            const room = await this.getRoomById(roomId);

            if (room.host === username) {
                if ("guest" in room) {
                    roomPollingService.setRoomPolling(roomId, 'DELETE')
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
