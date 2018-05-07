/* import {
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER
} from '../actions/users';


export default function usersReducer(users = [], action) {
    const { 
        type,
        data: theUser
    } = action;
    switch (type) {
        case CREATE_USER:
            return [
                ...users, theUser
            ];
        case DELETE_USER:
            return users.filter(user => user.id !== theUser.id);
        case UPDATE_USER:
            return users.map(user => (user.id === theUser.id) ? { ...user,
                ...theUser
            } : user);
        default:
            return users;
    }
} */