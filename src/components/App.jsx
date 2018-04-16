import React, {
    Component
} from 'react';
import { connect } from 'react-redux'

import { PersonForm } from "./PersonForm.jsx";
import { createPerson, deletePerson, updatePerson } from '../actions/people';

class App extends Component {

    getPersonDetails() {
        const { props } = this;
        const foundPerson = props.people.find(person => person.id == props.personId);
        return foundPerson ? foundPerson.fullName : 'person not found';
    }

    render() {
        const { props } = this;
        return (
            <div className="main">
                <ul>
                    {props.people.map(person => {
                        return (
                            <li className="item" key={person.id}>
                                <div className="fullName">{person.id} - {person.fullName}</div>
                                <PersonForm
                                    person={{ ...person }}
                                    onSubmit={(person) => props.updatePerson(person)} />
                                <button onClick={() => props.deletePerson(person)} >x</button>
                                <button onClick={() => props.loadPerson(person)}>Load</button>
                            </li>)
                    })}
                </ul>
                <PersonForm onSubmit={(person) => props.createPerson(person)} />
                {
                    props.personId && this.getPersonDetails()
                }
            </div>
        );
    }
};



const mapStateToProps =
    ({
        people,
        personId
    }) =>
        ({
            people,
            personId
        });

const mapDispatchToProps = dispatch => ({
    deletePerson: person => { dispatch(deletePerson(person)); },
    updatePerson: person => { dispatch(updatePerson(person)); },
    createPerson: person => { dispatch(createPerson(person)); },
    loadPerson: person => dispatch({ type: 'ROUTE_LOAD_PERSON', payload: { id: person.id } })
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


