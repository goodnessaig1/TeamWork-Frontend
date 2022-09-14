import { combineReducers } from "redux";
import { sessionReducer } from "redux-react-session";


const RootReducer = combineReducers({
    session: sessionReducer,
})

export default RootReducer;