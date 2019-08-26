let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let config = require("./config");
let _ = require("underscore");

let cors = require("cors");
let database = require("./database");
let jwt = require("jsonwebtoken");
let userService = require("./services/user");
let roomService = require("./services/room");
let roomPollingService = require("./services/room-polling");
let rankService = require("./services/rank");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let authApi = require("./api/auth");
let registerApi = require("./api/register");
let userApi = require("./api/user");
let leaderBoardApi = require("./api/leader-board");
let roomApi = require("./api/room");

let redisClient = require("./redis");

app.use("/api/auth", authApi);
app.use("/api/register", registerApi);
app.use("/api/users", userApi);
app.use("/api/leader-boards", leaderBoardApi);
app.use("/api/rooms", roomApi);

(async () => {
    let users = await userService.getPointAllUser();
    let points = [];
    users.forEach(user => {
        points.push(user.point);
        points.push(user.username);
    });
    redisClient.zadd("leader_board", points);
})();

setInterval(async () => {
    // console.log('polling ...')
    let rooms = await roomPollingService.getAllRooms();
    if (rooms.length !== 0) {
        io.of("/").emit("ROOM_POLLING_RESPONSE", rooms);
        await roomPollingService.clearRoomPolling();
    }
}, 10000);

_.each(io.nsps, function(nsp) {
    nsp.on("connect", function(socket) {
        if (!socket.auth) {
            delete nsp.connected[socket.id];
        }
    });
});

io.on("connection", function(socket) {
    socket.auth = false;
    socket.on("AUTHENTICATION_REQUEST", async data => {
        try {
            let { sub } = jwt.verify(data.token, config.jwtSecret);
            let user = await userService.getUserByUsername(sub);
            if (user) {
                let existed = false;
                _.each(io.nsps, function(nsp) {
                    if (_.findWhere(nsp.sockets, { username: sub })) {
                        existed = true;
                        socket.error = 'You have already logged in'
                    }
                });
                if (!existed) {
                    socket.emit("AUTHENTICATION_RESPONSE", {});
                    socket.auth = true;
                    socket.username = sub;
                    _.each(io.nsps, function(nsp) {
                        if (_.findWhere(nsp.sockets, { id: socket.id })) {
                            nsp.connected[socket.id] = socket;
                        }
                    });
                }
            }
        } catch (err) {
            // return next(new Error("authentication error"));
        }
    });

    setTimeout(() => {
        if (!socket.auth) {
            socket.emit("AUTHENTICATION_ERROR", socket.error ? socket.error : "Login failed!");
            socket.disconnect("unauthorized");
        }
    }, 2000);

    socket.once("disconnecting", async () => {
        let rooms = socket.rooms;
        for (let roomId in rooms) {
            try {
                socket.to(roomId).emit("USER_DISCONNECT_RESPONSE", {});
                let room = await roomService.getRoomById(roomId);
                try {
                    await userService.handleResult(
                        roomId,
                        socket.username === room.host ? room.guest : room.host,
                        true
                    );
                } catch (err) {}
                await roomService.quitRoom(roomId, socket.username);
            } catch (err) {
                // console.log(err)
            }
        }
    });

    socket.on("disconnect", () => {
        console.log(`${socket.username} disconnected`);
    });

    socket.on("CREATE_ROOM_REQUEST", data => {
        let room = roomService.createRoom(data);
        socket.join(room.roomId);
        io.sockets.in(room.roomId).emit("CREATE_ROOM_RESPONSE", {
            roomId: room.roomId,
            pet: data.pet
        });
    });

    socket.on("JOIN_ROOM_REQUEST", async data => {
        try {
            let guest = await userService.getUserByUsername(data.guest);
            let room = await roomService.joinRoom(data.roomId, guest);
            let host = await userService.getUserByUsername(room.host);
            socket.join(data.roomId);

            //send to host
            socket.to(data.roomId).emit("JOIN_ROOM_RESPONSE", {
                roomId: data.roomId,
                user: guest,
                role: "ROOM.GUEST",
                pet: room.point
            });

            //send to guest
            socket.emit("JOIN_ROOM_RESPONSE", {
                roomId: data.roomId,
                user: host,
                role: "ROOM.HOST",
                pet: room.point
            });
        } catch (err) {
            console.log(err);
            socket.emit("JOIN_ROOM_ERROR", err);
        }
    });

    socket.on("START_GAME_REQUEST", async data => {
        try {
            let room = await roomService.getValidGame(
                data.roomId,
                socket.username
            );
            let host = await userService.getUserByUsername(room.host);
            let guest = await userService.getUserByUsername(room.guest);
            if (host.point >= room.point && guest.point >= room.point) {
                roomService.changeStatus(data.roomId, "ROOM_PLAYING");
                io.of("/")
                    .in(room.roomId)
                    .emit("START_GAME_RESPONSE", {});
            } else {
                io.of("/")
                    .in(room.roomId)
                    .emit("START_GAME_ERROR", {
                        error: "The player does not have enough money"
                    });
            }
        } catch (err) {
            socket.emit("START_GAME_ERROR", err);
        }
    });

    socket.on("RESULT_REQUEST", async data => {
        await userService.handleResult(
            data.roomId,
            socket.username,
            data.result === "ROOM.RESULT_LOSE" ? true : false
        );
        roomService.changeStatus(data.roomId, "ROOM_WAITING");
        socket.to(data.roomId).emit("RESULT_RESPONSE", data);
    });

    socket.on("TICK_REQUEST", data => {
        socket.to(data.roomId).emit("TICK_RESPONSE", data);
    });

    socket.on("PLAY_AGAIN_REQUEST", data => {
        console.log("PLAY_AGAIN_REQUEST", data.roomId);
        socket.to(data.roomId).emit("PLAY_AGAIN_RESPONSE", data);
    });

    socket.on("CHAT_REQUEST", data => {
        socket.to(data.roomId).emit("CHAT_RESPONSE", data);
    });

    socket.on("USER_QUIT_REQUEST", async data => {
        try {
            socket.to(data.roomId).emit("USER_QUIT_RESPONSE", {});
            socket.leave(data.roomId);
            let room = await roomService.getRoomById(data.roomId);
            try {
                await userService.handleResult(
                    data.roomId,
                    socket.username === room.host ? room.guest : room.host,
                    true
                );
            } catch (err) {}
            await roomService.quitRoom(data.roomId, socket.username);
        } catch (err) {
            // console.log(err)
        }
    });
});

app.set("port", process.env.PORT || 3001);

http.listen(app.get("port"), () => {
    console.log("server is listening on port " + app.get("port"));
});
