import { combineReducers } from 'redux';
import stockReducer from './stocks/reducers';
import {companiesReducer, companyReducer, searchCompanyReducer} from './companies/reducers';

const rootReducers = combineReducers({
  stock: stockReducer,
  companies: companiesReducer,
  company: companyReducer,
  search: searchCompanyReducer,
})

export default rootReducers;