import {
    ROOM_POLLING,
    LROM_LOAD,
    LROM_LOADING,
    LROM_JOIN_ERROR,
    CLEAR_ERROR
} from "../actions/list-room";

const onRoomPolling = (oldRooms, rooms, username) => {
    let jointRoom = [...rooms, ...oldRooms];
    let jointRoomFilter = jointRoom
        .filter(
            (room, index) =>
                jointRoom.findIndex(r => room.roomId === r.roomId) === index
        )
        .filter(
            room => room.modified === undefined || room.modified === "UPDATE"
        )
        .filter(room => !(room.host === username || room.guest === username));

    return jointRoomFilter;
};

const listRoom = (
    state = { filter: "", rooms: [], load: false, error: false, n_error: 0 },
    action
) => {
    switch (action.type) {
        case LROM_JOIN_ERROR:
            return {
                ...state,
                error: action.error,
                n_error: state.n_error + 1
            };
        case LROM_LOADING:
            return { ...state, load: true };
        case LROM_LOAD:
            return { ...state, rooms: action.data, load: false };
        case ROOM_POLLING:
            return {
                ...state,
                rooms: onRoomPolling(state.rooms, action.rooms, action.username)
            };
        case CLEAR_ERROR:
            return {...state, error: ''}
        default:
            return state;
    }
};

export default listRoom;
