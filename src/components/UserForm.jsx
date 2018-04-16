import React, {
    Component
} from 'react';

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
                <input
                    onChange={(e) => { this.handleChange(e) }}
                    value={this.state.user.fullName}
                />
                <button type="submit">OK</button>
            </form>
        );
    }
}
