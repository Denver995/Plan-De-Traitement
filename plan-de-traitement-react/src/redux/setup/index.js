import createSagaMiddleWare from '@redux-saga/core';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const sagaMiddleWare = createSagaMiddleWare();

/**
 * @todo replace createStore with configureStore from toolkit
 */
const middlewares = [sagaMiddleWare];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(reducers, composedEnhancers);


export default store;