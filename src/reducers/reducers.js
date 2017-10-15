import {
    combineReducers,
} from 'redux';
import peopleReducer from './people'

export default combineReducers({
    people: peopleReducer
    //router: routerReducer
});