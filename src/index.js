import * as React from "react";
import * as ReactDOM from "react-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import {Provider} from 'react-redux';

import App from './app';
import store from './store';


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.querySelector('.root')
);
