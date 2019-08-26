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
    STATUS_PLAY_AGAIN,
    RESULT_WIN,
    PLAY_AGAIN,
    GUEST_PLAY_AGAIN,
    RESULT_LOSE,
    USER_DISCONNECT,
    QUIT,
    AUTHENTICATION_ERROR,
    AUTHENTICATION_RESPONSE,
    LOGOUT,
    RESTART,
    ERROR,
    CLEAR_ERROR,
    RESULT_DRAW
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

const initTiles = (rows, cols) => {
    let tiles = [];
    for (let i = 0; i < rows * cols; i++) {
        tiles.push({ value: 0 });
    }

    // let is = true;
    // for(let i = 0; i < rows * cols - 1; i++) {
    //     tiles[i].value = is ? CHESS_X : CHESS_O;
    //     is = !is
    // }

    return tiles;
};

const initState = (rows, cols, isHost) => {
    let tiles = initTiles(rows, cols);

    const CHESS = isHost ? CHESS_X : CHESS_O;

    let state = {
        authenticated: 0,
        logout: false,
        roomId: "",
        timeout: 15,
        opponent: initUser(),
        userWin: 0,
        opponentWin: 0,
        chess: CHESS,
        pet: 30000,
        key: false,
        board: {
            rows,
            cols,
            time: 15,
            tiles: tiles,
            turn: CHESS_X,
            lastTick: -1,
            lock: true,
            // count: rows * cols - 1
            count: 0
        },
        status: STATUS_WATTING,
        result: RESULT_NONE,
        chats: [],
        opponentQuit: false,
        guestContinue: false,
        error: false,
        n_error: 0
    };

    return state;
};

const restartState = state => {
    state.board = {
        ...state.board,
        time: state.timeout,
        tiles: initTiles(state.board.rows, state.board.cols),
        lock: true,
        lastTick: -1,
        turn: CHESS_X,
        count: 0
    };
    state.status =
        state.guestContinue && state.key ? STATUS_START_GAME : STATUS_WATTING;
    state.guestContinue = false;
    state.chess =
        state.result === RESULT_DRAW
            ? state.chess
            : state.result === RESULT_WIN && !state.opponentQuit
            ? CHESS_O
            : CHESS_X;
    state.opponentQuit = false;
    state.result = RESULT_NONE;
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
        state.board.count++;
    }
    return state;
};

const onPushChat = (state, chat) => {
    state.chats = [...state.chats, chat];
    return state;
};

const randomTiles = tiles => {
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
        if (state.chess === state.board.turn && state.board.count < state.board.rows * state.board.cols) {
            let id = randomTiles([...state.board.tiles]);
            state = onTick({ ...state }, id);
            state.socket.emit("TICK_REQUEST", {
                id,
                roomId: state.roomId
            });
        }
    }
    return state;
};

const onJoinRoom = (state, { roomId, role, user, pet }) => {
    if (role === HOST) {
        state.chess = CHESS_O;
    } else {
        state.chess = CHESS_X;
        if (state.status === STATUS_PLAY_AGAIN) {
            state.guestContinue = true;
        } else {
            state.status = STATUS_START_GAME;
        }
    }
    state.roomId = roomId;
    state.opponent = user;
    state.pet = parseInt(pet);
    return state;
};

const onUserDisconnect = state => {
    // console.log("onUserDisconnect");
    state.key = true;
    state.userWin = 0;
    state.opponentWin = 0;
    state.opponent = initUser();
    state.opponentQuit = true;
    if (state.status === STATUS_PLAYING) {
        state.board = { ...state.board, lock: true };
        state.status = STATUS_PLAY_AGAIN;
        state.result = RESULT_WIN;
    } else if (state.status === STATUS_START_GAME) {
        state.status = STATUS_WATTING;
        state.opponentQuit = false;
    }
    return state;
};

const room = (state = initState(25, 30, true), action) => {
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
            return {
                ...state,
                roomId: action.data.roomId,
                pet: parseInt(action.data.pet),
                key: true
            };
        case JOIN_ROOM:
            return onJoinRoom({ ...state }, action.data);
        case RESULT:
            return {
                ...state,
                result: action.result,
                board: { ...state.board, lock: true },
                status: STATUS_PLAY_AGAIN,
                userWin: state.userWin + (action.result === RESULT_WIN ? 1 : 0),
                opponentWin:
                    state.opponentWin + (action.result === RESULT_LOSE ? 1 : 0),
                opponent: {
                    ...state.opponent,
                    point:
                        state.opponent.point + action.result === RESULT_DRAW
                            ? 0
                            : action.result === RESULT_WIN
                            ? -state.pet
                            : state.pet + 100
                }
            };
        case PLAY_AGAIN:
            return restartState({ ...state });
        case GUEST_PLAY_AGAIN:
            return {
                ...state,
                status:
                    state.status === STATUS_WATTING
                        ? STATUS_START_GAME
                        : state.status,
                guestContinue: state.status === STATUS_PLAY_AGAIN
            };
        case USER_DISCONNECT:
            return onUserDisconnect({ ...state });
        case QUIT:
            return Object.assign({}, state, initState(25, 30, true), {
                authenticated: 2
            });
        case AUTHENTICATION_ERROR:
            return { ...state, authenticated: 1, error: action.error };
        case AUTHENTICATION_RESPONSE:
            return { ...state, authenticated: 2 };
        case LOGOUT:
            return { ...state, authenticated: 0, logout: true };
        case RESTART:
            return Object.assign({}, initState(25, 30, true));
        case ERROR:
            return {
                ...state,
                error: action.error,
                n_error: state.n_error + 1
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: ""
            };
        default:
            return state;
    }
};

export default room;
