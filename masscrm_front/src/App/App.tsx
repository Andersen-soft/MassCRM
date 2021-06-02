import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../utils/history';
import { store } from '../store/configureStore';
import { ViewEntryPoint } from '../view/ViewEntryPoint';

export const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <ViewEntryPoint />
    </Router>
  </Provider>
);
