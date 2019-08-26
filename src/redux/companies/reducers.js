import merge from 'lodash/merge';
import { TYPES } from './actions';

const companiesDefaultState = {
  data: [],
  loading: false,
  error: null,
};
const companyDefaultState = {
  data: null,
  loading: false,
  error: null,
  newsLoading: false,
  newsNextPage: null,
  newsError: null,
};

export const companyReducer = (state=companyDefaultState, action) => {
  switch(action.type) {
    case TYPES.FETCH_SINGLE_COMPANY_REQUEST:
      return { ...state,
        loading: true,
      };
    case TYPES.FETCH_SINGLE_COMPANY_SUCCESS:
      return { ...state,
        loading: false,
        data: action.payload.company,
        newsNextPage: action.payload.next_page,
      };
    case TYPES.FETCH_SINGLE_COMPANY_FAILURE:
      return { ...state,
        loading: false,
        error: action.payload,
      };
    case TYPES.FETCH_NEWS_FAILURE:
      return { ...state,
        newsLoading: false,
        newsError: action.payload,
      };
    case TYPES.FETCH_NEWS_SUCCESS:
      return merge(state, {
        newsLoading: false,
        data: {
          news: [...state.data.news, ...action.payload.news]
        },
        newsNextPage: action.payload.next_page
      });
    case TYPES.FETCH_NEWS_REQUEST:
      return { ...state,
        newsLoading: true,
      };
    case TYPES.CREATE_COMMENT_REQUEST:
      return state;
    case TYPES.CREATE_COMMENT_SUCCESS:
      return merge(state, {
        data: {
          comments: action.payload
        },
      });
    default: return state;
  }
}

export const companiesReducer = (state=companiesDefaultState, action) => {
  switch (action.type) {
    case TYPES.FETCH_COMPANIES_REQUEST:
      return {...state,
        loading: true,
      };
    case TYPES.FETCH_COMPANIES_SUCCESS:
      return {...state,
        loading: false,
        data: action.payload,
      };
    case TYPES.FETCH_COMPANIES_FAILURE:
      return {...state,
        loading: false,
        error: action.payload,
      };
    
    default: return state;
  }
};

const searchCompanyDefaultState = {
  loading: false,
  error: null,
  data: []
};

export const searchCompanyReducer = (state=searchCompanyDefaultState, action) => {
  switch (action.type) {
    case TYPES.SEARCH_COMPANY_REQUEST:
      return {...state,
        loading: true,
      };
    case TYPES.SEARCH_COMPANY_SUCCESS:
      return {...state,
        loading: false,
        data: action.payload,
      };
    case TYPES.SEARCH_COMPANY_FAILURE:
      return {...state,
        loading: false,
        error: action.payload,
      };
    
    default: return state;
  }
};
