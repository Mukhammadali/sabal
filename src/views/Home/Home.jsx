import React , { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { fetchStocksRequest } from '../../redux/stocks/actions'
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const mapState = (state) => ({
  ...state.stock
})


const Home = props => {
  const { stocks, loading, error } = useSelector(mapState);
  const dispatch = useDispatch();

  const onCardClick = (ticker) => {
    props.history.push(`/companies/${ticker}`);
  }
  
  useEffect(() =>{
    dispatch(fetchStocksRequest());
  },[])

  if(loading){
    return <Loading />
  }
  if(error){
    return <Error />
  }
  return (
    <Container>
      {
        stocks.map(stock => (
          <Card key={stock.security.id} onClick={() => onCardClick(stock.security.ticker)}>
            <h5 className="title">{stock.security.name}</h5>
            <div className="">
              <div>
                <strong>Open:</strong> {stock.stock_prices[0].open || '-'}
              </div>
              <div>
                <strong>Close:</strong> {stock.stock_prices[0].close || '-'}
              </div>
              <div>
                <strong>High:</strong> {stock.stock_prices[0].high || '-'}
              </div>
            </div>
          </Card>
        ))
      }
    </Container>
  );
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Home);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-top: 30px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid #cecece;
  padding: 10px;
  width: calc(100% / 6);
  border-radius: 10px;
  margin: 5px;
  min-width: 200px;
  .title {
    margin: 0px;
  }
`;
