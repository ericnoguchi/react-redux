import React, {
    Component
} from 'react';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        message: state.appReducer
    }
}

class App extends Component {
    render() {
        return <section className="main"><h1>{this.props.message}</h1></section>;
    }
}

export default connect(
    mapStateToProps
)(App);


