import { FILTER_CHANGE } from "../actions/filter";

const initListFilter = () => ({
    attribute: "point",
    order: "asc"
});

const filter = (state = initListFilter(), action) => {
    switch (action.type) {
        case FILTER_CHANGE:
            return {
                ...state,
                attribute: action.attribute,
                order: action.order
            };
        default:
            return state;
    }
};

export default filter;
