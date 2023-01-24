import { combineReducers } from 'redux';
import user from './userReducer';
import feeds from './feedsReducer';

const RootReducer = combineReducers({
    user,
    feeds,
});

export default RootReducer;
