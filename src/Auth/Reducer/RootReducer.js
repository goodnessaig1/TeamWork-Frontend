import { combineReducers } from 'redux';
import user from './userReducer';
import feeds from './feedsReducer';
import articles from './articleReducer';
import gifs from './gifReducer';

const RootReducer = combineReducers({
    user,
    feeds,
    articles,
    gifs,
});

export default RootReducer;
