import { api } from "../api/api";
import { store } from "../index";
export const ROOM_POLLING = "LIST_ROOM.ROOM_POLLING";
export const LROM_LOAD = "LROM_LOAD";
export const LROM_LOADING = "LROM_LOADING";

export const LROM_JOIN_ERROR = "LROM_JOIN_ERROR";
export const CLEAR_ERROR = "LIST_ROOM.CLEAR_ERROR";

export const onRoomPolling = rooms => ({
    type: ROOM_POLLING,
    rooms,
    username: store.getState().user.username
});

const reload_room = data => ({
    type: LROM_LOAD,
    data
});

export const join_room_error = error => ({
    type: LROM_JOIN_ERROR,
    error
});

export const listroom_load = () => dispatch => {
    dispatch({
        type: LROM_LOADING
    });
    api.get(`/rooms`).then(res => {
        dispatch(reload_room(res.data));
    });
};

export const onClearError = () => ({
    type: CLEAR_ERROR
})
