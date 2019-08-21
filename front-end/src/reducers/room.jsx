import {
    TICK,
    CHESS_X,
    CHESS_O,
    DESCREMENT_TIME,
    PUSH_CHAT,
    START_GAME,
    SOCKET_FETCHED,
    STATUS_WATTING,
    OPPONENT_INFO,
    JOIN_ROOM,
    HOST,
    STATUS_START_GAME,
    STATUS_PLAYING,
    CREATE_ROOM,
    RESULT,
    RESULT_NONE,
    STATUS_PLAY_AGAIN
} from "../actions/room";

const initUser = () => {
    return {
        username: "Opponent",
        avatar: `${process.env.PUBLIC_URL}/images/grinning.svg`,
        rank: 0,
        ratioWinning: "0%",
        point: 0
    };
};

// const initChat = () => {
//     let right = true;
//     let chat = [];
//     for (let i = 0; i < 15; i++) {
//         chat.push({
//             content: "hello boy",
//             right: right,
//             createdAt: new Date()
//         });
//         right = !right;
//     }
//     return chat;
// };

const generateTiles = (rows, cols, isHost) => {
    let tiles = [];
    for (let i = 0; i < rows * cols; i++) {
        tiles.push({ value: 0 });
    }

    const CHESS = isHost ? CHESS_X : CHESS_O;

    let state = {
        id: "",
        timeout: 15,
        opponent: initUser(),
        userWin: 0,
        opponentWin: 0,
        chess: CHESS,
        pet: 30000,
        board: {
            rows,
            cols,
            time: 15,
            tiles: tiles,
            turn: CHESS_X,
            lastTick: -1,
            lock: true
        },
        status: STATUS_WATTING,
        result: RESULT_NONE,
        chats: []
    };

    return state;
};

const changeTurn = turn => {
    return turn === CHESS_X ? CHESS_O : CHESS_X;
};

const onTick = (state, id) => {
    if (state.board.tiles[id].value === 0 && !state.board.lock) {
        state.board.tiles[id].value = state.board.turn;
        state.board.turn = changeTurn(state.board.turn);
        state.board.lastTick = id;
        state.board.time = state.timeout;
    }
    return state;
};

const onPushChat = (state, chat) => {
    state.chats = [...state.chats, chat];
    return state;
};

const randomTiles = (tiles, chess) => {
    let index = Math.floor(Math.random() * tiles.length);
    while (tiles[index].value !== 0) {
        index = Math.floor(Math.random() * tiles.length);
    }
    return index;
};

const descrementTime = state => {
    if (state.board.lock) return state;
    state.board.time--;
    if (state.board.time < 0) {
        state.board.time = state.timeout;
        if (state.chess === state.board.turn) {
            let id = randomTiles([...state.board.tiles], state.chess);
            state = onTick({ ...state }, id);
            state.socket.emit("TICK_REQUEST", {
                id,
                roomId: state.roomId
            });
        }
    }
    return state;
};

const onJoinRoom = (state, { roomId, role, user }) => {
    if (role === HOST) {
        state.chess = CHESS_O;
    } else {
        state.chess = CHESS_X;
        state.status = STATUS_START_GAME;
    }
    state.roomId = roomId;
    state.opponent = user;
    return state;
};

const room = (state = generateTiles(25, 30, true), action) => {
    switch (action.type) {
        case TICK:
            return onTick({ ...state }, action.id);
        case DESCREMENT_TIME:
            return descrementTime({ ...state });
        case PUSH_CHAT:
            return onPushChat({ ...state }, action.chat);
        case START_GAME:
            return {
                ...state,
                board: { ...state.board, lock: false },
                status: STATUS_PLAYING
            };
        case SOCKET_FETCHED:
            return { ...state, socket: action.socket };
        case OPPONENT_INFO:
            return { ...state, opponent: action.opponent };
        case CREATE_ROOM:
            return { ...state, id: action.id };
        case JOIN_ROOM:
            return onJoinRoom({ ...state }, action.data);
        case RESULT:
            return {
                ...state,
                result: action.result,
                board: { ...state.board, lock: true },
                status: STATUS_PLAY_AGAIN
            };
        default:
            return state;
    }
};

export default room;
