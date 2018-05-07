import React, { Component } from 'react';
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  color: ${props => props.theme.main};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user || {
                fullName: ''
            }
        };
    }

    handleChange(e) {
        this.setState({ user: { ...this.state.user, fullName: e.target.value } });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({ ...this.state.user });
    }

    render() {
        return (
            <form onSubmit={(e) => { this.handleSubmit(e) }}>
                <Input
                    onChange={(e) => { this.handleChange(e) }}
                    value={this.state.user.fullName}
                />
                <button className="button" type="submit">OK</button>
            </form>
        );
    }
}
