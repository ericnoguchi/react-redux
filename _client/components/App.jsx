import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { connectRequest, mutateAsync, querySelectors } from 'redux-query';
import { userQueries } from '../user/queries';
import { UserForm } from "./UserForm.jsx";
import styled from "styled-components";

const StyledSpinner = styled.span`
    color:${props => props.theme.spinnerColor};
`;
class App extends Component {

    render() {
        const {
            createUser,
            deleteUser,
            loadUser,
            loadedUser,
            updateUser,
            userQueryStatus,
            users,
        } = this.props;
        return (
            <section>
                <ul>
                    {users.map(user => {
                        return (
                            <li className="item" key={user.id}>
                                <div className="fullName">{user.id} - {user.fullName}</div>
                                <UserForm
                                    user={{ ...user }}
                                    onSubmit={(user) => updateUser(user)} />
                                <button onClick={() => deleteUser(user)} >x</button>
                                <button onClick={() => loadUser(user)}>Load</button>
                            </li>)
                    })}
                </ul>
                <UserForm onSubmit={(user) => createUser(user)} />
                <StyledSpinner>
                    {userQueryStatus && userQueryStatus.isPending && 'Spinner...'}
                </StyledSpinner>
                {userQueryStatus && userQueryStatus.isFinished && loadedUser.fullName}
            </section>
        );
    }
};


const mapPropsToConfigs = () => userQueries.allUsersQuery();


const mapStateToProps = (state) => {
    const {
        userId,
        entities,
        queries,
    } = state;

    const {
        user,
        users,
    } = entities;

    let props = {
        loadedUser: user,
        users,
        userId
    };

    if (userId) {
        const userQueryConfig = userQueries.getUserQuery({ id: userId });
        //listen to query status 
        const userQueryStatus = {
            isPending: querySelectors.isPending(queries, userQueryConfig),
            isFinished: querySelectors.isFinished(queries, userQueryConfig)
        }
        props = { ...props, userQueryStatus };
    }
    return props;
};

const mapDispatchToProps = dispatch => ({
    deleteUser: user => {
        compose(dispatch, mutateAsync, userQueries.deleteUserQuery)(user);
    },
    updateUser: user => {
        compose(dispatch, mutateAsync, userQueries.updateUserQuery)(user);
    },
    createUser: user => {
        compose(dispatch, mutateAsync, userQueries.createUserQuery)(user);
    },
    loadUser: user => {
        dispatch({ type: 'ROUTE_LOAD_USER', payload: { id: user.id } })
    }
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    connectRequest(mapPropsToConfigs)
)(App);
