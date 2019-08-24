import { ROOM_POLLING, LROM_LOAD, LROM_LOADING } from "../actions/list-room";

const onRoomPolling = (oldRooms, rooms) => {
    let jointRoom = [...rooms, ...oldRooms];
    let jointRoomFilter = jointRoom
        .filter(
            (room, index) =>
                jointRoom.findIndex(r => room.roomId === r.roomId) === index
        )
        .filter(
            room => room.modified === undefined || room.modified === "UPDATE"
        );

    return jointRoomFilter;
};

const listRoom = (state = { filter: "", rooms: [], load: false }, action) => {
    switch (action.type) {
        case LROM_LOADING:
            return { ...state, load: true };
        case LROM_LOAD:
            return { ...state, rooms: action.data, load: false };
        case ROOM_POLLING:
            return {
                ...state,
                rooms: onRoomPolling(state.rooms, action.rooms)
            };
        default:
            return state;
    }
};

export default listRoom;
