import superAxios from 'axios';

superAxios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
superAxios.defaults.headers.common.Authorization = `Bearer ${process.env.REACT_APP_INTRINO_KEY}`;


export default superAxios;