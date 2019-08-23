import { ROOM_POLLING, LROM_LOAD } from "../actions/list-room";

const onRoomPolling = (oldRooms, rooms) => {
    let jointRoom = [...rooms, ...oldRooms];
    let jointRoomFilter = jointRoom
        .filter((room, index) => jointRoom.findIndex(r => room.roomId === r.roomId) === index)
        .filter(
            room => room.modified === undefined || room.modified === "UPDATE"
        );

    return jointRoomFilter;
};

const listRoom = (state = {filter: "", rooms: []}, action) => {
    switch (action.type) {
        case LROM_LOAD:
            return { ...state, rooms: action.data };
        case ROOM_POLLING:
            return {...state, rooms: onRoomPolling(state.rooms, action.rooms)}
        default:
            return state;
    }
};

export default listRoom;
