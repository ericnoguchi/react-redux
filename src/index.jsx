import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.jsx';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReduces from './reducers/rootReducer.js'

let store = createStore(rootReduces, { appReducer: 'Hello World' });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);