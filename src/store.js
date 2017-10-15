import {
    createStore,
    //applyMiddleware
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

const store = createStore(rootReducer, initialState, /* applyMiddleware(middleware) */ );

store.subscribe(() => {
    console.log('store subscribe => ', store.getState());
});

export default store;