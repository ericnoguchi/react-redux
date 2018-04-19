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

    // dispatch redux query action to get user by id this returns a promise 
    // that the router will wait on 
    // this will also update state.entities.user which is mapped to props.user
    return compose(dispatch, requestAsync, userQueries.getUser)({
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