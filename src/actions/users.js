import store from '../store';


export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';


export const createUser = user => {
    const state = store.getState();
    const id = state.users.length ? Math.max(...state.users.map(user => +user.id)) + 1 : 1

    return {
        type: CREATE_USER,
        data: { ...user,
            id
        }
    }
};

export const deleteUser = user => ({
    type: DELETE_USER,
    data: user
});

export const updateUser = user => ({
    type: UPDATE_USER,
    data: user
});