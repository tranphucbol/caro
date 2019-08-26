import { getUsernameFromStorage } from "../utils/utils";
import { api } from "../api/api";
import { store } from "../index";
export const USER_INFO = "USER_INFO";
export const USER_ERROR = "USER_ERROR";
export const USER_CLEAR_ERROR = "USER.CLEAR_ERROR";
export const USER_UPDATEPOINT = "USER_UPDATEPOINT";

export const receivedUserInfo = user => ({
    type: USER_INFO,
    user
});

export const receivedMyInfo = data => ({
    type: USER_INFO,
    user: data
});

export const receivedError = error => ({
    type: USER_ERROR,
    error
});

export const clearError = () => ({
    type: USER_CLEAR_ERROR
});

export const loadMyInfo = () => {
    return dispatch => {
        let myUsername = getUsernameFromStorage();
        api.get(`/users/${myUsername}`).then(res => {
            dispatch(receivedMyInfo(res.data));
        });
    };
};

export const updateMyPoint = () => {
    let point = 0;
    let { pet, userWin } = store.getState().room;
    if (userWin) {
        point = 100 + pet;
    } else {
        point = -pet;
    }

    return {
        type: USER_UPDATEPOINT,
        point
    };
};
