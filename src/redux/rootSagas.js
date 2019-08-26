import { all } from 'redux-saga/effects';
import companiesSagas from './companies/sagas';
import stocksSagas from './stocks/sagas';

export default function* rootSaga(){
  yield all([
    stocksSagas(),
    companiesSagas()
  ])
}