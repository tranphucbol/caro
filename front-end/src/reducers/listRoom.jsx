import { LROM_LOAD } from "../actions/listRoom";

const initListRoom = () => ({
    filter: "",
    rooms: []
});

const listRoom = (state = initListRoom(), action) => {
    switch (action.type) {
        case LROM_LOAD:
            return { ...state, rooms: action.data };
        default:
            return state;
    }
};

export default listRoom;
