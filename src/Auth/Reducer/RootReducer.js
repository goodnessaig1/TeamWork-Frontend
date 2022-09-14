import { combineReducers } from "redux";
import { sessionReducer } from "redux-react-session";
import user from './userReducer';


const RootReducer = combineReducers({
    session: sessionReducer,
    user,
})

export default RootReducer;