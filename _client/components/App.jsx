import React, {
    Component
} from 'react';
import { connect } from 'react-redux'

import { UserForm } from "./UserForm.jsx";
import { createUser, deleteUser, updateUser } from '../actions/users';

class App extends Component {

    getUserDetails() {
        const { props } = this;
        const foundUser = props.users.find(user => user.id == props.userId);
        return foundUser ? foundUser.fullName : 'user not found';
    }

    render() {
        const { props } = this;
        return (
            <div className="main">
                <ul>
                    {props.users.map(user => {
                        return (
                            <li className="item" key={user.id}>
                                <div className="fullName">{user.id} - {user.fullName}</div>
                                <UserForm
                                    user={{ ...user }}
                                    onSubmit={(user) => props.updateUser(user)} />
                                <button onClick={() => props.deleteUser(user)} >x</button>
                                <button onClick={() => props.loadUser(user)}>Load</button>
                            </li>)
                    })}
                </ul>
                <UserForm onSubmit={(user) => props.createUser(user)} />
                {
                    props.userId && this.getUserDetails()
                }
            </div>
        );
    }
};



const mapStateToProps =
    ({
        users,
        userId
    }) =>
        ({
            users,
            userId
        });

const mapDispatchToProps = dispatch => ({
    deleteUser: user => { dispatch(deleteUser(user)); },
    updateUser: user => { dispatch(updateUser(user)); },
    createUser: user => { dispatch(createUser(user)); },
    loadUser: user => dispatch({ type: 'ROUTE_LOAD_USER', payload: { id: user.id } })
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


