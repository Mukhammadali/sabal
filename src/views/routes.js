import Home from './Home';
import Companies from './Companies';
import SingleCompany from './Companies/SingleCompany';


const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/companies',
    component: Companies,
    exact: true,
  },
  {
    path: '/companies/:ticker',
    component: SingleCompany,
  },
];

export default routes;
