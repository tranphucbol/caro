export const TICK = 'TICK'
export const TIME_UP = 'TIME_UP'
export const DESCREMENT_TIME = 'DESCREMENT_TIME'
export const CHESS_X = 1 
export const CHESS_O = 2

export const tickTile = id => ({
    type: TICK,
    id
})

export const timeUp = () => ({
    type: TIME_UP
})

export const descrementTime = () => ({
    type: DESCREMENT_TIME
})