import { combineReducers } from 'redux';
import user from './userReducer';
import feeds from './feedsReducer';
import articles from './articleReducer';
import gifs from './gifReducer';
import notifications from './notificationReducer';

const RootReducer = combineReducers({
    user,
    feeds,
    articles,
    gifs,
    notifications,
});

export default RootReducer;
