import React, {
    Component
} from 'react';

export class PersonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: props.person || {
                fullName: ''
            }
        };
    }

    handleChange(e) {
        this.setState({ person: { ...this.state.person, fullName: e.target.value } });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({ ...this.state.person });
    }

    render() {
        return (
            <form onSubmit={(e) => { this.handleSubmit(e) }}>
                <input
                    onChange={(e) => { this.handleChange(e) }}
                    value={this.state.person.fullName}
                />
                <button type="submit">OK</button>
            </form>
        );
    }
}
