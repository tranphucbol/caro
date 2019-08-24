import { api } from "../api/api";
export const ROOM_POLLING = "LIST_ROOM.ROOM_POLLING";
export const LROM_LOAD = "LROM_LOAD";
export const LROM_LOADING = "LROM_LOADING";

export const onRoomPolling = rooms => ({
    type: ROOM_POLLING,
    rooms
});

const reload_room = data => ({
    type: LROM_LOAD,
    data
});

export const listroom_load = () => dispatch => {
    dispatch({
        type: LROM_LOADING
    });
    api.get(`/rooms`).then(res => {
        dispatch(reload_room(res.data));
    });
};
