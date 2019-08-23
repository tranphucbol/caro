import { VIEW_CLOSECREATEROOM, VIEW_CREATEROOM } from "../actions/listRoom";

const initView = () => ({
    createRoom: false
});

const listRoom = (state = initView(), action) => {
    switch (action.type) {
        case VIEW_CLOSECREATEROOM:
            return { ...state, createRoom: false };
        case VIEW_CREATEROOM:
            return {
                ...state,
                createRoom: true
            };
        default:
            return state;
    }
};

export default listRoom;
