import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
// middlewares
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './ducks';

export default (initialState) => {
  const middlewares = [
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAIL']
    }),
  ];
  if ( process.env.NODE_ENV === 'development' ) {
    const logger = createLogger({
      collapsed: true,
    });
    middlewares.push(logger);
  }
  let checkEnableReduxTools = f => f;

  if ( window.devToolsExtension && process.env.NODE_ENV === 'development' ) {
    checkEnableReduxTools = window.devToolsExtension();
  }

  const store = createStore(rootReducer, initialState,
    compose(
      applyMiddleware(...middlewares),
      checkEnableReduxTools
    ));

  // hot reloading for reducers
  if ( module.hot ) {
    module.hot.accept('./ducks', () => {
      // eslint-disable-next-line global-require, import/newline-after-import
      const nextReducer = combineReducers(require('./ducks').default);
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

