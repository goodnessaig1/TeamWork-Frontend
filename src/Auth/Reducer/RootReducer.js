import { combineReducers } from 'redux';
import user from './userReducer';
import feeds from './feedsReducer';
import articles from './articleReducer';
import gifs from './gifReducer';
import notifications from './notificationReducer';
import admin from './adminReducer';

const RootReducer = combineReducers({
    user,
    feeds,
    articles,
    gifs,
    notifications,
    admin,
});

export default RootReducer;
