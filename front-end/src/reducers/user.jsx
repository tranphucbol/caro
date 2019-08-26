import {
    USER_INFO,
    USER_ERROR,
    USER_CLEAR_ERROR,
    USER_UPDATEPOINT
} from "../actions/user";

const initUser = () => {
    return {
        username: "Phuc dep trai",
        avatar: `${process.env.PUBLIC_URL}/images/shocked.svg`,
        rank: 100,
        ratioWinning: "50%",
        point: 100000
    };
};

const user = (state = initUser(), action) => {
    switch (action.type) {
        case USER_INFO:
            return action.user;
        case USER_ERROR:
            return { ...state, error: action.error };
        case USER_CLEAR_ERROR:
            return { ...state, error: "" };
        case USER_UPDATEPOINT:
            return {
                ...state,
                point: state.point + action.point
            };
        default:
            return state;
    }
};

export default user;
