import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { connectRequest, mutateAsync, querySelectors } from 'redux-query';
import styled from "styled-components";
import { userQueries } from '../user/queries';
import { UserForm } from "./UserForm.jsx";


const schema = {
    "type": "object",
    "properties": {
        "TV killed the radio star": {
            "title": "Your favourite state",
            "type": "object",
            "required": [
                "malaysian_state",
            ],
            "properties": {
                "malaysian_state": {
                    "type": "string",
                    "title": "Malaysian states",
                    "enum": [
                        "Kuala Lumpur",
                        "Johor",
                        "Kedah",
                        "Kelantan",
                        "Melaka",
                        "Negeri Sembilan",
                        "Pahang",
                        "Perak",
                        "Perlis",
                        "Pulau Pinang",
                        "Sabah",
                        "Sarawak",
                        "Selangor",
                        "Terengganu",
                        "Wilayah Persekutuan"
                    ]
                }
            }
        },
        title:{
            type:'string'
        }
    }
};

const uiSchema = {
    "TV killed the radio star": {
        "malaysian_state": {
            "ui:widget": "radio"
        }
    }
};

function CustomFieldTemplate(props) {
    const {id, classNames, label, help, required, description, errors, children} = props;
    return (
      <div className='bullshit'>
        <label htmlFor={id}>{label}{required ? "*" : null}</label>
        {description}
        {children}
        {errors}
        {help}
      </div>
    );
  }

const formData = {
/*     title: "First task",
    done: true,
    radios: [{ value: true }, { value: false }] */
};

const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);
const onError = (errors) => console.log("I have", errors.length, "errors to fix");

const StyledSpinner = styled.span`
    color:${props => props.theme.spinnerColor};
`;

const StyledSection = styled.section`
    padding:${props => props.theme.padding};
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
            <StyledSection>
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
                {
                    userQueryStatus &&
                    userQueryStatus.isPending &&
                    <StyledSpinner>Spinner...</StyledSpinner>
                }

                {userQueryStatus && userQueryStatus.isFinished && loadedUser.fullName}
                <br /><br />
                <div className="row">
                    <div className="col-md-4">
                        <Form
                        /*     FieldTemplate={CustomFieldTemplate}  */
                            schema={schema}
                            formData={formData}
                            uiSchema={uiSchema}
                            onSubmit={onSubmit}
                            onError={onError}
                        />
                    </div>
                </div>

            </StyledSection>
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
