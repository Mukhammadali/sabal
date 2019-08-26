/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducers';
import rootSagas from './rootSagas';

const defaultState = {};
const sagaMiddleware = createSagaMiddleware()



const store = createStore(rootReducers, defaultState, compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
);


sagaMiddleware.run(rootSagas)

export default store;