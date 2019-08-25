const redisClient = require("../redis");

module.exports = new (class RoomPollingService {
    setRoomPolling(roomId, modified) {
        const pollingKey = `room_polling:${roomId}`;
        redisClient.hmset(pollingKey, {
            roomId,
            modified
        });
    }

    async getAllRooms() {
        const roomPollingKeys = await redisClient.keysAsync("room_polling:*");
        const roomPollings = await Promise.all(
            roomPollingKeys.map(key => redisClient.hgetallAsync(key))
        );
        const roomsDelete = roomPollings.filter(
            room => room.modified === "DELETE"
        );

        const roomsUpdate = await Promise.all(
            roomPollings
                .filter(room => room.modified === "UPDATE")
                .map(room => redisClient.hgetallAsync(`room:${room.roomId}`))
        );
        return [
            ...roomsDelete,
            ...roomsUpdate.map(room => ({ ...room, modified: "UPDATE" }))
        ];
    }

    async clearRoomPolling() {
        const roomPollingKeys = await redisClient.keysAsync("room_polling:*");
        redisClient.del(roomPollingKeys);
    }
})();
