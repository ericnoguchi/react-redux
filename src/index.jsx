import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './components/App.jsx';
import store from './store.js';

// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory();


ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);