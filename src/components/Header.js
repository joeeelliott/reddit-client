import React from 'react';
import SideNav from './SideNav'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';

const Header = () => {
  const sideNavState = useSelector(selectShowSideNav)
  const dispatch = useDispatch();

  const handleShowSideNavClick = (e) => {
    sideNavState.toggleSideNav ? e.currentTarget.classList.toggle('Header_search-icon-rotate') : e.currentTarget.classList.toggle('Header_search-icon-rotate'); 

    dispatch(showSideNav()); 
  }

  return (
    <div className="Header_header">
      <div className="Header_toggle-btn-container">
        <FontAwesomeIcon icon="search" data-test-Header_search-icon data-test-Header_font-awesome-icon onClick={handleShowSideNavClick} />
      </div>

      <div className="Header_logo-title-container">
        <FontAwesomeIcon icon={['fab', 'reddit']} className="Header_font-awesome-icon" />

        <h1 className="Header_title">Reddit<span className="Header_title-span">Sample</span></h1>
      </div>

      <SideNav />
    </div>
  )
}

export default Header;