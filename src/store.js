import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import rootReducer from './reducers/reducers';

const initialState = {
    people: [{
            "id": 1,
            "fullName": "Allison Finch",
            "bool": true
        },
        {
            "id": 2,
            "fullName": "Jeanette Drake",
            "bool": true
        },
        {
            "id": 3,
            "fullName": "Hilda Anderson",
            "bool": false
        },
        {
            "id": 4,
            "fullName": "Sherri Boyette",
            "bool": false
        },
        {
            "id": 5,
            "fullName": "Ashley Boyd",
            "bool": true
        }
    ]

};

const middlewareOne = store => next => action => {
    console.log('middlewareOne')
    console.log(action);
    next(action);
    // can be async
    /*    setTimeout(() => {
        next(action)
    }, 1000) */
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewareTwo = store => next => action => {
    console.log('middlewareTwo')
    next(action)
}

const store = createStore(
    rootReducer, 
    initialState,
    composeEnhancers(
        applyMiddleware(
            middlewareOne,
            middlewareTwo
        )
    )
);

store.subscribe(() => {
    console.log('store subscribe');
});

export default store;