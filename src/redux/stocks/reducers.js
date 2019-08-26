import { TYPES } from './actions';

const defaultState = {
  stocks: [],
  loading: false,
  error: null,
};

const stockReducer = (state=defaultState, action) => {
  switch (action.type) {
    case TYPES.FETCH_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        loading: false,
        stocks: action.payload,
      };
    case TYPES.FETCH_STOCKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: return state;
  }
};


export default stockReducer;