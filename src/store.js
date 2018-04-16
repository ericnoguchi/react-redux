import createHistory from 'history/createBrowserHistory';
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';

//@see https://github.com/faceyspacey/redux-first-router
import {
    connectRoutes
} from 'redux-first-router';

import initialState from "./initialState";
import peopleReducer from './reducers/people';
import personIdReducer from "./reducers/personId";
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
    location: routerReducer,
    people: peopleReducer,
    personId: personIdReducer,
});

// MIDDLEWARES

// some custom middle for practice
const customMiddlewareOne = store => next => action => {
    console.log('middlewareOne')
    console.log(action);
    next(action);
    // can be async
    /*    setTimeout(() => {
        next(action)
    }, 1000) */
}


const customMiddlewareTwo = store => next => action => {
    console.log('middlewareTwo');
    next(action);
}

const middleware = applyMiddleware(
    routerMiddleware,
    customMiddlewareOne,
    customMiddlewareTwo
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
    console.log('store subscribe');
});

export default store;