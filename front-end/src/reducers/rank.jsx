import { RANK_LOAD, RANK_LOADING } from "../actions/rank";

const rank = (
    state = {
        list: [],
        load: false
    },
    action
) => {
    switch (action.type) {
        case RANK_LOADING:
            return {
                ...state,
                load: true
            };

        case RANK_LOAD:
            return { ...state, list: action.data, load: false };
        default:
            return state;
    }
};

export default rank;
