import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid'
import  { withRouter } from 'react-router-dom';

import {  
  fetchSingleCompanyRequest,
  fetchNewsRequest,
  createCommentRequest
} from '../../redux/companies/actions';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

const mapState = state => ({
  ...state.company,
})

const initialCommentState = {
  name: '',
  text: '',
};

const SingleCompany = props => {
  const { match: { params } } = props;
  const [commentState, setCommentState] = useState(initialCommentState);

  const { data, loading, error, newsLoading, newsNextPage } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch to start fetching company account + related news + comments
    dispatch(fetchSingleCompanyRequest(params.ticker))
  },[params.ticker])

  const onLoadMoreNews = () => {
    dispatch(fetchNewsRequest(params.ticker));
  }

  const onChangeComment = e => {
    setCommentState({ ...commentState, [e.target.name]: e.target.value });
  }

  const onSubmitComment = () => {
    if(commentState.name.length > 0 && commentState.text.length> 0) {
      const payload = {
        ticker: params.ticker,
        comment: { id: shortid.generate(), ...commentState },
      }
      dispatch(createCommentRequest(payload));
      setCommentState(initialCommentState);
    }
  }

  if(loading || !data){
    return <Loading />
  }
  if(error){
    return <Error />
  }


  return (
    <div>
      <div>
        <h4>Ticker: {data.ticker}</h4>
        <h5>Company Name: {data.name}</h5>
        <h5>CEO: {data.ceo}</h5>
        <h5>Legal Name: {data.legal_name}</h5>
        <h5>Entity Statuse: {data.entity_status}</h5>
        <h5>Country: {data.hq_country}</h5>
        <h5>Sector: {data.sector}</h5>
        <h5>Short Summary:</h5>
        <div>{data.short_description}</div>
        <div className="accordion" id="accordionExample">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <div className="btn text-left border-none d-flex align-item-center justify-content-between" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <div>Full Summary</div>
                </div>
              </h2>
            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
                {data.long_description}
              </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <h3>Comments:</h3>
        <div>
          <span>Name:</span>
          <br />
          <input className="form-control" value={commentState.name}  onChange={onChangeComment} name="name" placeholder="Name" />
        </div>
        <div>
          <span>Comment:</span>
          <br />
          <textarea className="form-control"   value={commentState.text} onChange={onChangeComment} name="text" placeholder="Enter Comment" />
        </div>
        <button
          type="button"
          onClick={onSubmitComment}
          className="btn btn-primary mt-2"
        >
          Create Comment
        </button>
      </div>
      <div className="my-3">
        <ul className="list-group">
          <li  className="list-group-item">
          {
            data && Array.isArray(data.comments) && data.comments.map(comment => (
                  <div key={comment.id} className="my-3">
                    <h6>Author: {comment.name}</h6>
                    <div>{comment.text}</div>
                  </div>
                ))
              }
          </li>
        </ul>
      </div>
      <div  className="my-3">
        <h3>Related News:</h3>
          <ul className="list-group">
            {
              data && Array.isArray(data.news) && data.news.map(newz => (
                <li  className="list-group-item" key={newz.id}>
                  <a href={newz.url} target="_blank" rel="noopener noreferrer" className="btn text-dark text-left">
                    <h4>{newz.title}</h4>
                    <div>{newz.summary}</div>
                    <br/>
                    <div>
                      <strong>Published date:</strong>{' '}
                      {moment(newz.publication_date).format('YYYY-MM-DD hh:mm')}
                    </div>
                  </a>
                </li>
              ))
            }
          {newsNextPage && (
            <button 
              disabled={newsLoading}
              type="button"
              className="btn btn-primary"
              onClick={onLoadMoreNews}
            >
              {newsLoading ? 'Loading...':'Load More'}
            </button>
          )}
          </ul>
      </div>
    </div>
  );
}

SingleCompany.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default withRouter(SingleCompany);
