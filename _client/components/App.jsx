import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { connectRequest, mutateAsync } from 'redux-query';
import { createUser, deleteUser, updateUser } from '../actions/users';
import { UserForm } from "./UserForm.jsx";


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

const queries = {
    // get all users
    allUsers: () => ({
        url: '//localhost:3000/users',
        update: {
            users: (prev, next) => next,
        },
    }),
    newUser: (user, optimistic) => {
        const config = {
            url: `//localhost:3000/users`,
            body: user,
            update: {
                users: (previousUsers, nextUser) => {
                   
                    return [...previousUsers, ...nextUser]
                },
            },
            //options: { method: 'POST' },
        };

 /*        if (true) {
            config.optimisticUpdate = {
                users: previousUsers => {
                    console.log('OPT', [...previousUsers, .user])
                    return [...previousUsers, user]
                }
            };
        } */

        return config;
    },
}


const mapPropsToConfigs = () => queries.allUsers();


var mapStateToProps = (state) => {
    console.log(state)
    var entities = state.entities,
        userId = state.userId;
    return {
        users: entities.users,
        userId: userId
    };
};

const mapDispatchToProps = dispatch => ({
    deleteUser: user => { dispatch(deleteUser(user)); },
    updateUser: user => { dispatch(updateUser(user)); },
    createUser: user => { dispatch(mutateAsync(queries.newUser(user))); },
    loadUser: user => dispatch({ type: 'ROUTE_LOAD_USER', payload: { id: user.id } })
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    connectRequest(mapPropsToConfigs)
)(App);
