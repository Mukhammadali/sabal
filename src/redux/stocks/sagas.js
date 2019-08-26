import { call, put, all, takeLatest } from 'redux-saga/effects';
import superAxios from '../../helpers/superAxios';
import { TYPES, fetchStocksFailure, fetchStocksSuccess } from './actions';

const stocksList = [
  'IBM',
  'KO',
  'AXP',
  'XOM',
  'WMT',
  'AAPL',
  'INTC',
  'VZ',
  'BA',
  'MSFT',
];


const StocksAPI = {
  fetchAll: () => Promise.all(stocksList.map(stock => {
    return superAxios.get(`/securities/${stock}/prices?page_size=1`);
  }))
}

function* fetchStocks(){
  try {
    const response = yield call(StocksAPI.fetchAll);
    const stocks = response.map(res => res.data)
    yield put(fetchStocksSuccess(stocks))
  } catch (err){
    console.log(err);
    yield put(fetchStocksFailure(err))
  }
}


export default function* rootSaga(){
  yield all([
    takeLatest(TYPES.FETCH_STOCKS_REQUEST, fetchStocks)
  ])
}