import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleWare = createSagaMiddleWare();

/**
 * @todo replace createStore with configureStore from toolkit
 */
  const middlewares = [sagaMiddleWare];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(reducers, composedEnhancers);

sagaMiddleWare.run(sagas);

export default store;