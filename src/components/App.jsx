import React, {
    Component
} from 'react';
import { connect } from 'react-redux'

import { PersonForm } from "./PersonForm.jsx";
import { createPerson, deletePerson, updatePerson } from '../actions/people';

const App = (props) => (
    <div className="main">
        <ul>{props.people.map(person => {
            return (<li className="item" key={person.id}>
                <div className="fullName">{person.id} - {person.fullName}</div>
                <PersonForm person={{ ...person }} onSubmit={(person) => props.updatePerson(person)} />
                <button onClick={() => props.deletePerson(person)} >x</button>
            </li>)
        })}
        </ul>
        <PersonForm onSubmit={(person) => props.createPerson(person)} />
    </div>
);



const mapStateToProps = ({ people }) => ({ people });

const mapDispatchToProps = dispatch => ({
    deletePerson: person => { dispatch(deletePerson(person)); },
    updatePerson: person => { dispatch(updatePerson(person)); },
    createPerson: person => { dispatch(createPerson(person)); }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


