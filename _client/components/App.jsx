import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { connectRequest, mutateAsync } from 'redux-query';
import { userQueries } from '../user/queries';
import { UserForm } from "./UserForm.jsx";


class App extends Component {

    render() {
        const { props } = this;
        console.log(props)
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
                    props.userId && props.user && props.user.fullName
                }
            </div>
        );
    }
};



const mapPropsToConfigs = () => userQueries.allUsers();


const mapStateToProps = (state) => {
    const {
        userId,
        entities
    } = state;

    const {
        user,
        users,
    } = entities;

    return {
        user,
        users,
        userId
    };
};

const mapDispatchToProps = dispatch => ({
    deleteUser: user => {
        compose(dispatch, mutateAsync, userQueries.deleteUser)(user);
    },
    updateUser: user => {
        compose(dispatch, mutateAsync, userQueries.updateUser)(user);
    },
    createUser: user => {
        compose(dispatch, mutateAsync, userQueries.createUser)(user);
    },
    loadUser: user => {
        dispatch({ type: 'ROUTE_LOAD_USER', payload: { id: user.id } })
    }
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    connectRequest(mapPropsToConfigs)
)(App);
