import React from 'react';
import "./index.scss"
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from 'react-redux'
import {store} from "./reduser/redusers";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
