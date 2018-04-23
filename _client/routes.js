import {
    compose
} from 'redux';
import {
    requestAsync
} from 'redux-query';
import {
    userQueries
} from "./user/queries";


const userThunk = (dispatch, getState) => {
    //user id from URL
    const {
        id
    } = getState().location.payload 


    return compose(dispatch, requestAsync, userQueries.getUserQuery)({
        id
    });

}

//@see https://github.com/faceyspacey/redux-first-router#routesmap
export default {
    ROUTE_HOME: '/', // action <-> url path
    ROUTE_LOAD_USER: {
        path: '/users/:id', // :id is a dynamic segment
        thunk: userThunk,
    }
}