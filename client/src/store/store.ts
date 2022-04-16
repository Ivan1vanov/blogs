import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from './reducer/userReducer';
import { postReducer } from './reducer/postReducer';



const reducer = combineReducers({
    user: userReducer,
    posts: postReducer
})

export const store = createStore(reducer, applyMiddleware(compose(thunk)))