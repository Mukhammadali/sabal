import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div>
      <header className="App-header mt-3">
        <ul className="nav align-items-center justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/companies">Companies</Link>
          </li>
          <div className="nav-item" onClick={() => setModalVisible(true)}>
            <i className="fa fa-search" />
          </div>
        </ul>
      </header>
        <SearchOverlay modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </div>
  )
}

export default Header
