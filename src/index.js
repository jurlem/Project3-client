import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MyProvider} from './components/ReactContext';

import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render (
  <MyProvider>

    <Router>
      <App />
    </Router>
  </MyProvider>,
  document.getElementById ('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister ();
