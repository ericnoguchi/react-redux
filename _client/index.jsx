import AppContainer from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';


// Define what props.theme will look like
const theme = {
    padding:'20px',
    main: 'blue',
    spinnerColor: 'red'
};


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppContainer />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);