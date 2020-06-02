import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom'

import reducer from './Redux/Reducers'
import middleware from './Redux/Middleware'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

