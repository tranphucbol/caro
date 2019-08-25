import { combineReducers } from "redux";
import room from "./room";
import user from "./user";
import rank from "./rank";
import listRoom from "./list-room";
import filter from "./filter";

export default combineReducers({
    room,
    user,
    rank,
    listRoom,
    filter
});
