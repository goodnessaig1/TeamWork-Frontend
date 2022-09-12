import { createStore, applyMiddleware } from 'redux'
import RootReducer from '../Reducer/RootReducer'
import { sessionService } from 'redux-react-session'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


const store = createStoreWithMiddleware(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


sessionService.initSessionService(store);


export default store;