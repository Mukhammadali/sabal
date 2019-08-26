
export const TYPES = {
  FETCH_COMPANIES_REQUEST: 'FETCH_COMPANIES_REQUEST',
  FETCH_COMPANIES_SUCCESS: 'FETCH_COMPANIES_SUCCESS',
  FETCH_COMPANIES_FAILURE: 'FETCH_COMPANIES_FAILURE',
  FETCH_SINGLE_COMPANY_REQUEST: 'FETCH_SINGLE_COMPANY_REQUEST',
  FETCH_SINGLE_COMPANY_SUCCESS: 'FETCH_SINGLE_COMPANY_SUCCESS',
  FETCH_SINGLE_COMPANY_FAILURE: 'FETCH_SINGLE_COMPANY_FAILURE',
  SEARCH_COMPANY_REQUEST: 'SEARCH_COMPANY_REQUEST',
  SEARCH_COMPANY_FAILURE: 'SEARCH_COMPANY_FAILURE',
  SEARCH_COMPANY_SUCCESS: 'SEARCH_COMPANY_SUCCESS',
  FETCH_NEWS_REQUEST: 'FETCH_NEWS_REQUEST',
  FETCH_NEWS_SUCCESS: 'FETCH_NEWS_SUCCESS',
  FETCH_NEWS_FAILURE: 'FETCH_NEWS_FAILURE',
  CREATE_COMMENT_REQUEST: 'CREATE_COMMENT_REQUEST',
  CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',
};

export const fetchCompaniesRequest = () => ({
  type: TYPES.FETCH_COMPANIES_REQUEST,
});

export const fetchCompaniesSuccess = (payload) => ({
  type: TYPES.FETCH_COMPANIES_SUCCESS,
  payload,
});

export const fetchCompaniesFailure = (payload) => ({
  type: TYPES.FETCH_COMPANIES_FAILURE,
  payload,
});

export const fetchSingleCompanyRequest = (ticker) => ({
  type: TYPES.FETCH_SINGLE_COMPANY_REQUEST,
  payload: ticker,
});

export const fetchSingleCompanySuccess = (payload) => ({
  type: TYPES.FETCH_SINGLE_COMPANY_SUCCESS,
  payload,
});

export const fetchSingleCompanyFailure = (payload) => ({
  type: TYPES.FETCH_SINGLE_COMPANY_FAILURE,
  payload,
});

export const searchCompanyRequest = (payload) => ({
  type: TYPES.SEARCH_COMPANY_REQUEST,
  payload,
});

export const searchCompanySuccess = (payload) => ({
  type: TYPES.SEARCH_COMPANY_SUCCESS,
  payload,
});

export const searchCompanyFailure = (payload) => ({
  type: TYPES.SEARCH_COMPANY_FAILURE,
  payload,
});

export const fetchNewsRequest = (payload) => ({
  type: TYPES.FETCH_NEWS_REQUEST,
  payload,
});

export const fetchNewsSuccess = (payload) => ({
  type: TYPES.FETCH_NEWS_SUCCESS,
  payload,
});

export const fetchNewsFailure = (payload) => ({
  type: TYPES.FETCH_NEWS_FAILURE,
  payload,
});

export const createCommentRequest = (payload) => ({
  type: TYPES.CREATE_COMMENT_REQUEST,
  payload,
});

export const createCommentSuccess = (payload) => ({
  type: TYPES.CREATE_COMMENT_SUCCESS,
  payload,
});
