import { RANK_LOAD } from "../actions/rank";

const rank = (state = [], action) => {
    switch (action.type) {
        case RANK_LOAD:
            return action.data;
        default:
            return state;
    }
};

export default rank;
