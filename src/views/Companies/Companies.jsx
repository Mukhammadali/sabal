import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { Link } from 'react-router-dom';

import { fetchCompaniesRequest } from '../../redux/companies/actions';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const mapState = state => ({
  ...state.companies,
})

const Companies = () => {
  const { data, loading, error } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompaniesRequest())
  },[])


  if(loading){
    return <Loading />
  }
  if(error){
    return <Error />
  }

  return (
    <div>
      <h3>Companies</h3>
      <ul className="list-group">
        {
          data && Array.isArray(data.companies) && data.companies.map(company => (
            <li className="list-group-item" key={company.id}>
              <Link to={`/companies/${company.ticker}`}>
                <h4>{company.name}</h4>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Companies;

