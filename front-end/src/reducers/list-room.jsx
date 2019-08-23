import { ROOM_POLLING } from "../actions/list-room";

const onRoomPolling = (oldRooms, rooms) => {
    let jointRoom = [...rooms, ...oldRooms];
    let jointRoomFilter = jointRoom
        .filter((room, index) => jointRoom.findIndex(r => room.roomId === r.roomId) === index)
        .filter(
            room => room.modified === undefined || room.modified === "UPDATE"
        );

    return jointRoomFilter;
};

const listRoom = (state = [], action) => {
    switch (action.type) {
        case ROOM_POLLING:
            return onRoomPolling(state, action.rooms);
        default:
            return state;
    }
};

export default listRoom;
