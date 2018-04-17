import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
//@see https://github.com/faceyspacey/redux-first-router
import { connectRoutes } from 'redux-first-router';
//@see https://amplitude.github.io/redux-query/#/
import { entitiesReducer, queriesReducer, queryMiddleware } from 'redux-query';
import initialState from "./initialState";
import userIdReducer from "./reducers/userId";
import usersReducer from './reducers/users';
import routes from "./routes";

const history = createHistory();

// REDUX DEVTOOLS SETUP
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// REDUX FIRST ROUTER SETUP
const {
    reducer: routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer,
} = connectRoutes(history, routes);

// ROOT REDUCER
const rootReducer = combineReducers({
    // redux query reducers
    entities: entitiesReducer,
    queries: queriesReducer,
    // redux first router reducers
    location: routerReducer,
    userId: userIdReducer,
    // initial state reducer
    
    users: usersReducer,
});

// MIDDLEWARES

// some custom middle for practice
const customMiddlewareOne = store => next => action => {
    //console.log('middlewareOne')
    console.log(action.type);
    next(action);
    // can be async
    /*    setTimeout(() => {
        next(action)
    }, 1000) */
}


/* const customMiddlewareTwo = store => next => action => {
    console.log('middlewareTwo');
    next(action);
} */

//REDUX QUERY SETUP
export const getQueries = (state) => state.queries;
export const getEntities = (state) => state.entities;
const reduxQueryMiddleware = queryMiddleware(getQueries, getEntities);

const middleware = applyMiddleware(
    reduxQueryMiddleware,
    routerMiddleware,
    customMiddlewareOne,
    //customMiddlewareTwo
);

const enhancers = composeEnhancers(
    routerEnhancer,
    middleware
);

// STORE
const store = createStore(
    rootReducer,
    initialState,
    enhancers
);

store.subscribe(() => {
    //console.log('store subscribe');
});

export default store;