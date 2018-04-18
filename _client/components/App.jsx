import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { connectRequest, mutateAsync, requestAsync } from 'redux-query';
import { createUser, deleteUser, updateUser } from '../actions/users';
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

const queries = {
    // get all users
    allUsers: () => ({
        url: '//localhost:3000/users',
        update: {
            users: (prev, next) => next,
        },
    }),
    getUser: (user) => ({
        url: `//localhost:3000/users/${user.id}`,
        force: true,
        queryKey: `getUser${user.id}`,
        update: {
            user: (previousLoadedUser, loadedUser) => {
                //console.log('user', previousLoadedUser, loadedUser)
                return loadedUser
            }
        },
    }),

    createUser: (user, optimistic) => {
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

    updateUser: (user, optimistic) => {
        const config = {
            url: `//localhost:3000/users/${user.id}`,
            body: user,
            update: {
                users: (previousUsers, nextUsers) => {
                    return [...nextUsers]
                },
            },
            options: { method: 'PUT' },
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

    deleteUser: (user, optimistic) => {
        const config = {
            url: `//localhost:3000/users/${user.id}`,
            body: user,
            update: {
                users: (previousUsers, nextUsers) => {
                    return [...nextUsers]
                },
            },
            options: { method: 'DELETE' },
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
        compose(dispatch, mutateAsync, queries.deleteUser)(user);
    },
    updateUser: user => {
        compose(dispatch, mutateAsync, queries.updateUser)(user);
    },
    createUser: user => {
        compose(dispatch, mutateAsync, queries.createUser)(user);
    },
    loadUser: user => {
        dispatch({ type: 'ROUTE_LOAD_USER', payload: { id: user.id } })
        compose(dispatch, requestAsync, queries.getUser)(user);
    }
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    connectRequest(mapPropsToConfigs)
)(App);
