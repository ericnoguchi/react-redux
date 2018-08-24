import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { connectRequest, mutateAsync, querySelectors } from 'redux-query';
import styled from "styled-components";
import { userQueries } from '../user/queries';
import { UserForm } from "./UserForm.jsx";
var ReactOverflowTooltip = require('react-overflow-tooltip')

const schema = {
    "type": "object",
    "properties": {
        "TV killed the radio star": {
            "title": "Your favourite state",
            "required": [
                "malaysian_state",
            ],
            "type": "object",
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
        title: {
            type: 'string'
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
    const { id, classNames, label, help, required, description, errors, children } = props;
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

const onSubmit = (form) => console.log("Data submitted: ", form);
const onError = (errors) => console.log("I have", errors.length, "errors to fix");

const StyledSpinner = styled.span`
    color:${props => props.theme.spinnerColor};
`;

const StyledSection = styled.section`
    padding:${props => props.theme.padding};
`;

const StyledSpan = styled.span`
   color:red;
`;

class ET extends Component {

    constructor(props) {
        super(props);
        this.innerEle = React.createRef();
        this.outerEle = React.createRef();
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);


    }

    componentDidMount() {
        const nodeInner = this.innerEle.current;
        const nodeOuter = this.outerEle.current;


        nodeOuter.style.border = '1px solid black';
        nodeOuter.style.width = '150px';
        nodeOuter.style.whiteSpace = 'nowrap';
        nodeOuter.style.overflow = 'hidden';
        nodeOuter.style.textOverflow = 'ellipsis';
        nodeOuter.style.display = 'inline-block';

        nodeInner.style.transition = 'left 3s';
        nodeInner.style.color = 'red';
        nodeInner.style.position = 'relative';
        nodeInner.style.left = '0';



    }


    mouseEnter() {

        const nodeInner = this.innerEle.current;
        const nodeOuter = this.outerEle.current;

        nodeOuter.style.textOverflow = 'clip';
        nodeInner.style.transition = 'left 3s';
        nodeInner.style.left = `-${wDiff}px`;

        const wDiff = nodeInner.offsetWidth - nodeOuter.offsetWidth;
        console.log('wDiff', wDiff)

    }
    mouseLeave() {
        console.log('leave')
        const nodeInner = this.innerEle.current;
        const nodeOuter = this.outerEle.current;
        nodeOuter.style.textOverflow = 'ellipsis';
        nodeInner.style.transition = '';
        nodeInner.style.left = `0`;

    }
    render() {
        return (<div ref={this.outerEle}
            onMouseOver={this.mouseEnter}
            onMouseOut={this.mouseLeave} >
            <span ref={this.innerEle} >
                {this.props.children}
            </span>
        </div>)
    }
}
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
                <ReactOverflowTooltip title='too long text'>
                    <div>too long text</div>
                </ReactOverflowTooltip>

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
