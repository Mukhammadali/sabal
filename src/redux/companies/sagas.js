import { call, put, all, takeLatest, delay, select, takeEvery } from 'redux-saga/effects';
import superAxios from '../../helpers/superAxios';
import { TYPES, fetchNewsFailure, fetchNewsSuccess,  fetchSingleCompanySuccess, fetchSingleCompanyFailure, fetchCompaniesFailure, fetchCompaniesSuccess, searchCompanyRequest, searchCompanySuccess, searchCompanyFailure, createCommentSuccess } from './actions';


const CompaniesAPI = {
  fetchAll: () => superAxios.get(`/companies?page_size=30`),
  fetchByTicker: (ticker) => superAxios.get(`/companies/${ticker}`),
  searchCompany: (searchTerm) => superAxios.get(`/companies/search?query=${searchTerm}`),
  fetchNewsByCompany: ({ ticker, next_page }) =>  {
    return superAxios.get(`/companies/${ticker}/news?page_size=5${
      next_page ? `&next_page=${next_page}`: ''
    }`)
  },
  fetchCommentsByCompany: (ticker) => {
    const comments = JSON.parse(localStorage.getItem(`comments:${ticker}`)) || [];
    return comments.reverse();
  },
  createCommentByCompany: ({ ticker, comment }) => {
    const comments = JSON.parse(localStorage.getItem(`comments:${ticker}`)) || [];
    const newComments = [...comments, comment];
    localStorage.setItem(`comments:${ticker}`, JSON.stringify(newComments));
    return newComments.reverse();
  }
}

function* fetchCompanies(){
  try {
    const response = yield call(CompaniesAPI.fetchAll);
    const companies = response.data.companies.sort((a,b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
    yield put(fetchCompaniesSuccess({ companies }))
  } catch (err){
    console.log(err);
    yield put(fetchCompaniesFailure(err))
  }
}


export const getCompanyState = (state) => state.company

function* fetchCompany(action){
  try {
    // get state
    const companyState = yield select(getCompanyState)
    const payload = {
      ticker: action.payload,
      next_page: companyState.newsNextPage,
    };
    // fetch company details
    const response = yield call(CompaniesAPI.fetchByTicker, action.payload);
    // fetch news related to the company
    const newsResponse = yield call(CompaniesAPI.fetchNewsByCompany, payload);
    // fetch comments
    const comments = yield call(CompaniesAPI.fetchCommentsByCompany, action.payload);

    // merge all
    response.data.news = newsResponse.data.news;
    response.data.comments = comments;
    const data = {
      company: response.data,
      next_page: newsResponse.data.next_page
    };
    yield put(fetchSingleCompanySuccess(data))
  } catch (err){
    console.log(err);
    yield put(fetchSingleCompanyFailure(err))
  }
}

function* searchCompany(action){
  try {
    //  Debouncing Search Query using delay and takeLatest 
    //  takeLatest cancels all pending reqs and takes only the latest
    yield delay(300)
    const response = yield call(CompaniesAPI.searchCompany, action.payload);
    yield put(searchCompanySuccess(response.data.companies))
  } catch (err){
    console.log(err);
    yield put(searchCompanyFailure(err))
  }
}

function* fetchMoreNews(action){
  try {
    const companyState = yield select(getCompanyState)
    const payload = {
      ticker: action.payload,
      next_page: companyState.newsNextPage,
    };
    const response = yield call(CompaniesAPI.fetchNewsByCompany, payload);
    yield put(fetchNewsSuccess(response.data))
  } catch (err){
    console.log(err);
    yield put(fetchNewsFailure(err))
  }
}

function* createComment(action){
  try {
    const comments = yield call(CompaniesAPI.createCommentByCompany, action.payload);
    yield put(createCommentSuccess(comments))
  } catch (err){
    console.log(err);
  }
}


export default function* rootSaga(){
  yield all([
    takeLatest(TYPES.FETCH_COMPANIES_REQUEST, fetchCompanies),
    takeLatest(TYPES.FETCH_SINGLE_COMPANY_REQUEST, fetchCompany),
    takeLatest(TYPES.SEARCH_COMPANY_REQUEST, searchCompany),
    takeLatest(TYPES.FETCH_NEWS_REQUEST, fetchMoreNews),
    takeEvery(TYPES.CREATE_COMMENT_REQUEST, createComment)
  ])
}