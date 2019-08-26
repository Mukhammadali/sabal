import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveModal from "react-responsive-modal";
import  { withRouter } from 'react-router-dom';
import styled from "styled-components";

import { searchCompanyRequest } from '../redux/companies/actions';

const styles = {
  modal: {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
    overflow: "none",
    width: "100%",
    padding: "0",
    margin: "0",
    height: "100%",
    minWidth: "100%",
    justifyContent: "center"
  },
  overlay: {
    backgroundColor: "#1cccc",
    padding: 0
  },
  closeIcon: {
    fill: "#fff"
  }
};

const mapState = state => ({
  ...state.search
});

const SearchOverlay = props => {
  const [value, setValue] = useState('');

  const { setModalVisible, modalVisible, history } = props;
  const { data, loading } = useSelector(mapState);
  const dispatch = useDispatch();

  
  const onInputChange = (searchTerm) => {
    dispatch(searchCompanyRequest(searchTerm))
    setValue(searchTerm);
  }

  const onListItemClick = (ticker) => {
    onInputChange('');
    history.push(`/companies/${ticker}`)
    setModalVisible(false);
  }

  const onModalClose = () => {
    onInputChange('');
    setModalVisible(false)
  }

  return (
    <ResponsiveModal
      open={modalVisible}
      onClose={onModalClose}
      styles={styles}
      animationDuration={1000}
      focusTrapped
      closeIconSize={40}
      showCloseIcon
    >
      <SearchInput>
        <Input placeholder="Search..." value={value} onChange={(e) => onInputChange(e.target.value)} />
      </SearchInput>
      {data.length === 0 && !loading && value.length > 0 && <div className="text-center text-white mt-3">NO RESULTS FOUND</div>}
      <ul className="list-group w-100 mt-3">
       {
          data && Array.isArray(data) && data.map(company => (
            <li
              className="list-group-item-dark my-2 w-100 p-2 pl-3"
              key={company.id}
              onClick={() => onListItemClick(company.ticker)}
            >
              {company.name}
            </li>
          ))
        }
      </ul>
    </ResponsiveModal>
  );
};

SearchOverlay.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(SearchOverlay);

const Input = styled.input`
  outline: none;
  border: none;
  text-transform: capitalize;
  color: #fff;
  min-width: 90%;
  background: none;
  &::placeholder {
    color: #828387;
  }
  font-size: 24px;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2d2e33;
  padding: 10px 30px;
  border-radius: 10px;
  margin-top: 30px;
  height: 50px !important;
  width: 30rem;
`;
