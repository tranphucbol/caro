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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let authApi = require("./api/auth");
let registerApi = require("./api/register");
let userApi = require("./api/user");
let leaderBoardApi = require("./api/leader-board");

app.use("/api/auth", authApi);
app.use("/api/register", registerApi);
app.use("/api/users", userApi);
app.use("/api/leader-boards", leaderBoardApi);

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

io.on("connection", function(socket) {
    let username = socket.handshake.query.username;
    console.log(`${username} connected`);
    socket.join(username);

    socket.once("disconnecting", () => {
        let rooms = socket.rooms
        for(let room in rooms) {
            console.log(username, room)
            socket.to(room).emit("USER_DISCONNECT_RESPONSE", {})
        }
    })

    socket.on("disconnect", () => {
        console.log(`${username} disconnected`);        
    });

    socket.on("CREATE_ROOM_REQUEST", data => {
        let room = roomService.createRoom(data);
        socket.join(room.roomId);
        io.sockets
            .in(room.roomId)
            .emit("CREATE_ROOM_RESPONSE", {
                roomId: room.roomId,
                pet: data.pet
            });
    });

    socket.on("JOIN_ROOM_REQUEST", async data => {
        try {
            let host = await userService.getUserByUsername(data.host);
            let guest = await userService.getUserByUsername(data.guest);
            let room = await roomService.joinRoom(data.roomId, guest);
            socket.join(data.roomId);

            //send to host
            socket.to(data.host).emit("JOIN_ROOM_RESPONSE", {
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
            console.log(err)
            io.sockets.in(data.guest).emit("JOIN_ROOM_ERROR", err);
        }
    });

    socket.on("START_GAME_REQUEST", async data => {
        try {
            let room = await roomService.getValidGame(data.roomId, username);
            io.sockets.in(room.roomId).emit("START_GAME_RESPONSE", {});
        } catch (err) {
            io.sockets.in(username).emit("START_GAME_ERROR", err);
        }
    });

    socket.on("RESULT_LOSE_REQUEST", async data => {
        let room = await roomService.getRoomById(data.roomId);
        let point = parseInt(room.point);
        await userService.updateGame(username, point + 100, 0);
        let usernameOpponent = username === room.host ? room.guest : room.host;
        await userService.updateGame(usernameOpponent, -point);
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
});

app.set("port", process.env.PORT || 3001);

http.listen(app.get("port"), () => {
    console.log("server is listening on port " + app.get("port"));
});
