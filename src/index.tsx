import React from 'react';
import ReactDOM from 'react-dom';
import './rtc/'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createDoc } from './rtc/index';
import { initialState } from './store/index';

createDoc(initialState)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
