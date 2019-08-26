export const TYPES = {
  FETCH_STOCKS_REQUEST: 'FETCH_STOCKS_REQUEST',
  FETCH_STOCKS_SUCCESS: 'FETCH_STOCKS_SUCCESS',
  FETCH_STOCKS_FAILURE: 'FETCH_STOCKS_FAILURE'
};


export const fetchStocksRequest = () => ({
  type: TYPES.FETCH_STOCKS_REQUEST,
});

export const fetchStocksSuccess = (payload) => ({
  type: TYPES.FETCH_STOCKS_SUCCESS,
  payload,
});

export const fetchStocksFailure = (payload) => ({
  type: TYPES.FETCH_STOCKS_FAILURE,
  payload,
});
