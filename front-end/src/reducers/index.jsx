import { combineReducers } from 'redux'
import room from './room'
import user from './user'

export default combineReducers({
    room,
    user
})