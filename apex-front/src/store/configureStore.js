import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";

import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware, saveToLocalStorage} from "./localStorage";
import userReducer from "./reducers/usersReducer";
import commonsReducer from "./reducers/commonsReducer";


export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: userReducer,
    commons: commonsReducer
});
const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState,enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    })
});

export default store;