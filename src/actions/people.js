import store from '../store';


export const CREATE_PERSON = 'CREATE_PERSON';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';


export const createPerson = person => {
    const state = store.getState();
    const id = state.people.length ? Math.max(...state.people.map(person => +person.id)) + 1 : 1

    return {
        type: CREATE_PERSON,
        data: { ...person,
            id
        }
    }
};

export const deletePerson = person => ({
    type: DELETE_PERSON,
    data: person
});

export const updatePerson = person => ({
    type: UPDATE_PERSON,
    data: person
});