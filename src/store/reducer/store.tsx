
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// @ts-ignore
import {PersonDataReducer} from "./PersonDataReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    person: PersonDataReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
