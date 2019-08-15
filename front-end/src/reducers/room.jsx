import { TICK, CHESS_X, CHESS_O, DESCREMENT_TIME } from "../actions/room";

const initUser = () => {
  return {
      username: 'ViewSonic',
      avatar: `${process.env.PUBLIC_URL}/images/grinning.svg`,
      rank: 100,
      ratioWinning: '58%',
      point: 20000
  }
}

const generateTiles = (rows, cols) => {

  let tiles = [];
  for(let i = 0; i < rows * cols; i++) {
    tiles.push({value: 0})
  }

  let state = {
    timeout: 15,
    opponent: initUser(),
    userWin: 0,
    opponentWin: 0,
    board: {
      rows,
      cols,
      time: 15,
      tiles: tiles,
      turn: CHESS_X,
      lastTick: -1
    }
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
    state.board.time = state.timeout
  }
  return state;
}

const descrementTime = (state) => {
  state.board.time--
  if(state.board.time < 0)
    state.board.time = state.timeout
  return state
}

const room = (state = generateTiles(25, 30), action) => {
  switch (action.type) {
    case TICK:
      return onTick({ ...state }, action.id)
      case DESCREMENT_TIME:
        return  descrementTime({...state})
    default:
      return state;
  }
};

export default room;
