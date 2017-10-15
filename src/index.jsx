import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Provider } from 'react-redux'
// import { Route } from 'react-router-dom'
import store from './store.js';
import App from './components/App.jsx';

// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory();


ReactDOM.render(
    <Provider store={store}>
        <App />
        { /* ConnectedRouter will use the store from Provider automatically */}
        {/* <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/about" component={App} />
            </div>
        </ConnectedRouter> */}
    </Provider>,
    document.getElementById('root')
);