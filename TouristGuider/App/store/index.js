import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/reducers';


const middleware =  applyMiddleware(thunk);

const rootReducer = combineReducers({
    main: mainReducer
})

const store = createStore(
    rootReducer, middleware
);

export default store;