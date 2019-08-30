const redisClient = require("../redis");

module.exports =  new class RankService {
    updatePointInLeaderBoard(username, point) {
        redisClient.zadd("leader_board", parseFloat(point), username);
    }

    async getRankByUsername(username) {
        let rank = await redisClient.zrevrankAsync("leader_board",username);
        return rank + 1
    }

    getTop100() {
        return redisClient.zrevrangeAsync("leader_board", 0, 99)
    }
}