import { getUsernameFromStorage } from "../utils/utils";
import { api } from "../api/api";

export const USER_INFO = "USER_INFO";

export const receivedUserInfo = user => ({
    type: USER_INFO,
    user
});

export const receivedMyInfo = data => ({
    type: USER_INFO,
    user: data
});

export const loadMyInfo = () => {
    return dispatch => {
        let myUsername = getUsernameFromStorage();
        api.get(`/users/${myUsername}`).then(res => {
            dispatch(receivedMyInfo(res.data));
        });
    };
};
