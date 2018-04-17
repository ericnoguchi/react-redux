import {
    NOT_FOUND
} from 'redux-first-router'

export default (state = null, action = {}) => {
    switch (action.type) {
        case NOT_FOUND:
            return null
        case 'ROUTE_LOAD_USER':
            return action.payload.id
        default:
            return state
    }
}