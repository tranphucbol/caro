import {
    getJwtFromStorage,
    getUsernameFromStorage,
    clearStorage
} from "../utils/utils";
import socketIOClient from "socket.io-client";
import { store } from "../index";
import { api } from "../api/api";
import { onRoomPolling, LROM_JOIN_ERROR } from "./list-room";

export const TICK = "ROOM.TICK";
export const TIME_UP = "ROOM.TIME_UP";
export const DESCREMENT_TIME = "ROOM.DESCREMENT_TIME";
export const PUSH_CHAT = "ROOM.PUSH_CHAT";
export const START_GAME = "ROOM.START_GAME";
export const SOCKET_FETCHED = "ROOM.SOCKET_FETCH";
export const CHESS_X = 1;
export const CHESS_O = 2;
export const STATUS_START_GAME = "ROOM.STATUS_START_GAME";
export const STATUS_PLAY_AGAIN = "ROOM.STATUS_PLAY_AGAIN";
export const STATUS_WATTING = "ROOM.STATUS_WAITING";
export const STATUS_PLAYING = "ROOM.STATUS_PLAYING";
export const OPPONENT_INFO = "ROOM.OPPONENT_INFO";
export const USER_INFO = "ROOM.USER_INFO";
export const EMPTY = "ROOM.EMPTY";
export const CREATE_ROOM = "ROOM.CREATE_ROOM";
export const JOIN_ROOM = "ROOM.JOIN_ROOM";
export const HOST = "ROOM.HOST";
export const GUEST = "ROOM.GUEST";
export const RESULT = "ROOM.RESULT";
export const RESULT_WIN = "ROOM.RESULT_WIN";
export const RESULT_LOSE = "ROOM.RESULT_LOSE";
export const RESULT_NONE = "ROOM.RESULT_NONE";
export const PLAY_AGAIN = "ROOM.PLAY_AGAIN";
export const GUEST_PLAY_AGAIN = "ROOM.GUEST_PLAY_AGAIN";
export const USER_DISCONNECT = "ROOM.USER_DISCONNECT";
export const QUIT = "ROOM.QUIT";
export const AUTHENTICATION_ERROR = "ROOM.AUTHENTICATION_ERROR";
export const AUTHENTICATION_RESPONSE = "ROOM.AUTHENTICATION_RESPONSE";
export const LOGOUT = "ROOM.LOGOUT";
export const RESTART = "ROOM.RESTART";
export const ERROR = "ROOM.ERROR";

export const tickTile = id => {
    let { roomId, socket, chess } = store.getState().room;
    let { turn, tiles } = store.getState().room.board;
    if (chess === turn && tiles[id].value === 0) {
        socket.emit("TICK_REQUEST", {
            id,
            roomId
        });
        return { type: TICK, id };
    }
    return { type: EMPTY };
};

export const onCheckWin = () => {
    let lastTick = store.getState().room.board.lastTick;
    if (lastTick !== -1 && checkWin()) {
        let socket = store.getState().room.socket;
        let roomId = store.getState().room.roomId;
        socket.emit("RESULT_LOSE_REQUEST", { roomId, result: RESULT_LOSE });
        return {
            type: RESULT,
            result: RESULT_WIN
        };
    }
    return {
        type: EMPTY
    };
};

const checkWin = () => {
    let board = store.getState().room.board;
    if (
        checkVertical(board) ||
        checkHorizontal(board) ||
        checkMajorDiagonal(board) ||
        checkMinorDiagonal(board)
    ) {
        return true;
    } else {
        return false;
    }
};

const checkVertical = ({ tiles, lastTick, rows, cols, turn }) => {
    let userChess = turn === CHESS_X ? CHESS_O : CHESS_X;
    let opponentChess = turn;

    let head = false;
    let tail = false;
    let count = 1;

    let i = Math.floor(lastTick / cols);
    let j = lastTick % cols;

    for (let k = 1; k < 6; k++) {
        if (i - k < 0) break;
        let id = (i - k) * cols + j;
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            head = true;
        } else {
            break;
        }
    }

    for (let k = 1; k < 6; k++) {
        if (i + k === rows) break;
        let id = (i + k) * cols + j;
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            tail = true;
            break;
        } else {
            break;
        }
    }

    if (head && tail) {
        return false;
    } else if (count === 5) {
        return true;
    } else {
        return false;
    }
};

const checkHorizontal = ({ tiles, lastTick, rows, cols, turn }) => {
    let userChess = turn === CHESS_X ? CHESS_O : CHESS_X;
    let opponentChess = turn;

    let head = false;
    let tail = false;
    let count = 1;

    let i = Math.floor(lastTick / cols);
    let j = lastTick % cols;

    for (let k = 1; k < 6; k++) {
        if (j - k < 0) break;
        let id = i * cols + (j - k);
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            head = true;
            break;
        } else {
            break;
        }
    }

    for (let k = 1; k < 6; k++) {
        if (j + k === cols) break;
        let id = i * cols + (j + k);
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            tail = true;
            break;
        } else {
            break;
        }
    }

    if (head && tail) {
        return false;
    } else if (count === 5) {
        return true;
    } else {
        return false;
    }
};

const checkMajorDiagonal = ({ tiles, lastTick, rows, cols, turn }) => {
    let userChess = turn === CHESS_X ? CHESS_O : CHESS_X;
    let opponentChess = turn;

    let head = false;
    let tail = false;
    let count = 1;

    let i = Math.floor(lastTick / cols);
    let j = lastTick % cols;

    for (let k = 1; k < 6; k++) {
        if (i - k < 0 || j - k < 0) break;
        let id = (i - k) * cols + (j - k);
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            head = true;
            break;
        } else {
            break;
        }
    }

    for (let k = 1; k < 6; k++) {
        if (i + k === rows || j + k === cols) break;
        let id = (i + k) * cols + (j + k);
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            tail = true;
        } else {
            break;
        }
    }

    if (head && tail) {
        return false;
    } else if (count === 5) {
        return true;
    } else {
        return false;
    }
};

const checkMinorDiagonal = ({ tiles, lastTick, rows, cols, turn }) => {
    let userChess = turn === CHESS_X ? CHESS_O : CHESS_X;
    let opponentChess = turn;

    let head = false;
    let tail = false;
    let count = 1;

    let i = Math.floor(lastTick / cols);
    let j = lastTick % cols;

    for (let k = 1; k < 6; k++) {
        if (i + k === rows || j - k < 0) break;
        let id = (i + k) * cols + (j - k);
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            head = true;
            break;
        } else {
            break;
        }
    }

    for (let k = 1; k < 6; k++) {
        if (i - k < 0 || j + k === cols) break;
        let id = (i - k) * cols + (j + k);
        if (tiles[id].value === userChess) {
            count++;
        } else if (tiles[id].value === opponentChess) {
            tail = true;
            break;
        } else {
            break;
        }
    }

    if (head && tail) {
        return false;
    } else if (count === 5) {
        return true;
    } else return false;
};

export const timeUp = () => ({
    type: TIME_UP
});

export const descrementTime = () => ({
    type: DESCREMENT_TIME
});

export const onPushChat = chat => {
    let socket = store.getState().room.socket;
    let roomId = store.getState().room.roomId;
    socket.emit("CHAT_REQUEST", {
        roomId,
        chat
    });
    return { type: PUSH_CHAT, chat };
};

export const initialSocketIO = () => {
    if (store.getState().room.socket !== undefined) return { type: EMPTY };
    console.log("connection");
    const jwt = getJwtFromStorage();
    const socket = socketIOClient("http://localhost:3001");

    socket.on("connect", function() {
        socket.emit("AUTHENTICATION_REQUEST", { token: jwt });
    });

    socket.on("AUTHENTICATION_RESPONSE", data => {
        console.log("hello");
        store.dispatch({ type: AUTHENTICATION_RESPONSE });
    });

    socket.on("AUTHENTICATION_ERROR", error => {
        store.dispatch({ type: AUTHENTICATION_ERROR, error: error });
    });

    socket.on("disconnect", data => {
        console.log(data);
    });
    socket.on("TICK_RESPONSE", data => {
        console.log("TICK_RESPONSE:", data);
        store.dispatch({ type: TICK, id: data.id });
    });

    socket.on("CREATE_ROOM_RESPONSE", data => {
        console.log(data.roomId);
        store.dispatch({ type: CREATE_ROOM, data });
    });

    socket.on("JOIN_ROOM_RESPONSE", data => {
        console.log(data);
        store.dispatch({ type: JOIN_ROOM, data });
    });

    socket.on("JOIN_ROOM_ERROR", data => {
        console.log(data);
        store.dispatch({
            type: LROM_JOIN_ERROR,
            error: data.error
        });
    });

    socket.on("START_GAME_RESPONSE", data => {
        store.dispatch({ type: START_GAME });
    });

    socket.on("RESULT_LOSE_RESPONSE", data => {
        console.log(data);
        store.dispatch({
            type: RESULT,
            result: data.result
        });
    });

    socket.on("START_GAME_ERROR", data => {
        console.log(data);
        store.dispatch({ type: ERROR, error: data.error });
    });

    socket.on("PLAY_AGAIN_RESPONSE", data => {
        console.log(data);
        store.dispatch({
            type: GUEST_PLAY_AGAIN
        });
    });

    socket.on("CHAT_RESPONSE", data => {
        store.dispatch({
            type: PUSH_CHAT,
            chat: { ...data.chat, right: false }
        });
    });

    socket.on("USER_DISCONNECT_RESPONSE", data => {
        store.dispatch({
            type: USER_DISCONNECT
        });
    });

    socket.on("USER_QUIT_RESPONSE", data => {
        store.dispatch({
            type: USER_DISCONNECT
        });
    });

    socket.on("ROOM_POLLING_RESPONSE", data => {
        store.dispatch(onRoomPolling(data));
    });

    return {
        type: SOCKET_FETCHED,
        socket
    };
};

export const receivedOpponentInfo = user => ({
    type: OPPONENT_INFO,
    opponent: {
        username: user.username,
        avatar: user.avatar,
        point: user.point,
        rank: user.rank,
        ratioWinning: `${
            user.gameCount === 0
                ? 0
                : (user.winningCount / user.gameCount).toFixed(1) * 100
        }%`
    }
});

export const getOpponentInfo = username => {
    return dispatch => {
        api.get(`/users/${username}`).then(res => {
            dispatch(receivedOpponentInfo(res.data));
        });
    };
};

export const createRoom = (pet, name) => {
    store.getState().room.socket.emit("CREATE_ROOM_REQUEST", {
        username: getUsernameFromStorage(),
        pet,
        name
    });
    return {
        type: EMPTY
    };
};

export const joinRoom = roomId => {
    // console.log("JOIN_ROOM_REQUEST: ", host)
    store.getState().room.socket.emit("JOIN_ROOM_REQUEST", {
        roomId,
        guest: getUsernameFromStorage()
    });
    return {
        type: EMPTY
    };
};

export const onStartGame = () => {
    let roomId = store.getState().room.roomId;
    let socket = store.getState().room.socket;
    socket.emit("START_GAME_REQUEST", {
        roomId
    });
    return {
        type: EMPTY
    };
};

export const onPlayAgain = () => {
    let key = store.getState().room.key;
    if (!key) {
        let socket = store.getState().room.socket;
        let roomId = store.getState().room.roomId;
        socket.emit("PLAY_AGAIN_REQUEST", {
            roomId
        });
    }
    return {
        type: PLAY_AGAIN
    };
};

export const onQuit = () => {
    let socket = store.getState().room.socket;
    let roomId = store.getState().room.roomId;
    socket.emit("USER_QUIT_REQUEST", { roomId });
    return {
        type: QUIT
    };
};

export const onLogOut = () => {
    clearStorage();
    return {
        type: LOGOUT
    };
};

export const onRestart = () => ({
    type: RESTART
});
