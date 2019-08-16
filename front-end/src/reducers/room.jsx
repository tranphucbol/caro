import {
    TICK,
    CHESS_X,
    CHESS_O,
    DESCREMENT_TIME,
    PUSH_CHAT
} from "../actions/room";

const initUser = () => {
    return {
        username: "ViewSonic",
        avatar: `${process.env.PUBLIC_URL}/images/grinning.svg`,
        rank: 5,
        ratioWinning: "58%",
        point: 20000
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

const generateTiles = (rows, cols) => {
    let tiles = [];
    for (let i = 0; i < rows * cols; i++) {
        tiles.push({ value: 0 });
    }

    let state = {
        timeout: 15,
        opponent: initUser(),
        userWin: 0,
        opponentWin: 0,
        chess: CHESS_X,
        board: {
            rows,
            cols,
            time: 15,
            tiles: tiles,
            turn: CHESS_X,
            lastTick: -1
        },
        chats: []
    };

    return state;
};

const changeTurn = turn => {
    return turn === CHESS_X ? CHESS_O : CHESS_X;
};

const onTick = (state, id) => {
    if (state.board.tiles[id].value === 0) {
        state.board.tiles[id].value = state.board.turn;
        state.board.turn = changeTurn(state.board.turn);
        state.board.lastTick = id;
        state.board.time = state.timeout;
    }
    return state;
};

const onPushChat = (state, chat) => {
    state.chats = [...state.chats, chat]
    return state;
};

const descrementTime = state => {
    state.board.time--;
    if (state.board.time < 0) state.board.time = state.timeout;
    return state;
};

const room = (state = generateTiles(25, 30), action) => {
    switch (action.type) {
        case TICK:
            return onTick({ ...state }, action.id);
        case DESCREMENT_TIME:
            return descrementTime({ ...state });
        case PUSH_CHAT:
            return onPushChat(state, action.chat);
        default:
            return state;
    }
};

export default room;
