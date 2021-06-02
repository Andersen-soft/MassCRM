import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IStoreState } from 'src/interfaces';
import { websocketMiddleware } from 'src/store';
import rootReducer from './rootReducer';

export const configureStore = (): Store<IStoreState> => {
  const middlewares = [thunk, websocketMiddleware];

  let middleware = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, middleware) as Store<IStoreState>;

  return store;
};

export const store = configureStore();
