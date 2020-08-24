import React from 'react';
import ReactDOM from 'react-dom';
import history from 'src/store/history';
import { Provider } from 'react-redux';
import { store } from 'src/store/configureStore';
import { Router } from 'react-router-dom';
import { App } from './components';
import 'src/styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
