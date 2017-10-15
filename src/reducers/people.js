import {
    CREATE_PERSON,
    DELETE_PERSON,
    UPDATE_PERSON
} from '../actions/people';


export default function peopleReducer(people = [], action) {
    const {
        type,
        data: thePerson
    } = action;
    switch (type) {
        case CREATE_PERSON:
            return [
                ...people, thePerson
            ];
        case DELETE_PERSON:
            return people.filter(person => person.id !== thePerson.id);
        case UPDATE_PERSON:
            return people.map(person => (person.id === thePerson.id) ? { ...person,
                ...thePerson
            } : person);
        default:
            return people;
    }
}