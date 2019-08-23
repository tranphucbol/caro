let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let config = require("./config");

let cors = require("cors");
let database = require("./database");
let jwt = require("jsonwebtoken");
let userService = require("./services/user");
let roomService = require("./services/room");
let roomPollingService = require("./services/room-polling");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let authApi = require("./api/auth");
let registerApi = require("./api/register");
let userApi = require("./api/user");
let leaderBoardApi = require("./api/leader-board");
let roomApi = require("./api/room");

app.use("/api/auth", authApi);
app.use("/api/register", registerApi);
app.use("/api/users", userApi);
app.use("/api/leader-boards", leaderBoardApi);
app.use("/api/rooms", roomApi);

io.use(async (socket, next) => {
    let token = socket.handshake.query.token;
    try {
        let { sub } = jwt.verify(token, config.jwtSecret);
        let user = await userService.getUserByUsername(sub);
        if (!user) throw Error("authentication error");
        socket.handshake.query.username = sub;
        return next();
    } catch (err) {
        return next(new Error("authentication error"));
    }
});

setInterval(async () => {
    // console.log('polling ...')
    let rooms = await roomPollingService.getAllRooms()
    if(rooms.length !== 0) {
        io.of('/').emit('ROOM_POLLING_RESPONSE', rooms)
        await roomPollingService.clearRoomPolling()
    }
}, 10000)

io.on("connection", function(socket) {
    let username = socket.handshake.query.username;
    console.log(`${username} connected`);
    socket.join(username);

    socket.once("disconnecting", async () => {
        let rooms = socket.rooms;
        for (let roomId in rooms) {
            try {
                socket.to(roomId).emit("USER_DISCONNECT_RESPONSE", {});
                let room = await roomService.getRoomById(roomId);
                try {
                    await userService.handleResult(
                        roomId,
                        username === room.host ? room.guest : room.host
                    );
                } catch (err) {}
                await roomService.quitRoom(roomId, username);
            } catch (err) {
                // console.log(err)
            }
        }
    });

    socket.on("disconnect", () => {
        console.log(`${username} disconnected`);
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
            io.sockets.in(data.guest).emit("JOIN_ROOM_RESPONSE", {
                roomId: data.roomId,
                user: host,
                role: "ROOM.HOST",
                pet: room.point
            });
        } catch (err) {
            console.log(err);
            io.sockets.in(data.guest).emit("JOIN_ROOM_ERROR", err);
        }
    });

    socket.on("START_GAME_REQUEST", async data => {
        try {
            let room = await roomService.getValidGame(data.roomId, username);
            roomService.changeStatus(data.roomId, "ROOM_PLAYING");
            io.sockets.in(room.roomId).emit("START_GAME_RESPONSE", {});
        } catch (err) {
            io.sockets.in(username).emit("START_GAME_ERROR", err);
        }
    });

    socket.on("RESULT_LOSE_REQUEST", async data => {
        await userService.handleResult(data.roomId, username);
        roomService.changeStatus(data.roomId, "ROOM_WAITING");
        socket.to(data.roomId).emit("RESULT_LOSE_RESPONSE", data);
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
            socket.to(data.roomId).emit("USER_QUIT_RESPONSE", {})
            let room = await roomService.getRoomById(data.roomId);
            try {
                await userService.handleResult(
                    data.roomId,
                    username === room.host ? room.guest : room.host
                );
            } catch (err) {}
            await roomService.quitRoom(data.roomId, username);
        } catch (err) {
            // console.log(err)
        }
    })
});

app.set("port", process.env.PORT || 3001);

http.listen(app.get("port"), () => {
    console.log("server is listening on port " + app.get("port"));
});
