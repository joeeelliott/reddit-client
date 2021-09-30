import React from 'react';
import SideNav from './SideNav'; 
import Nav from './Nav'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';

const Header = () => {
  const sideNavState = useSelector(selectShowSideNav)
  const dispatch = useDispatch();

  const handleShowSideNavClick = (e) => {
    sideNavState.toggleSideNav ? e.currentTarget.classList.toggle('header_search-icon-rotate') : e.currentTarget.classList.toggle('header_search-icon-rotate'); 

    dispatch(showSideNav()); 
  }

  return (

    <div className="header_header">
      <div className="header_toggle-btn-container">
          <FontAwesomeIcon data-testid="search-icon" icon="search" className="header_search-icon header_font-awesome-icon" onClick={handleShowSideNavClick} />
      </div>

      <div className="header_toggle-and-title-container">

        <div className="header_logo-title-container">
          <FontAwesomeIcon data-testid="reddit-icon" icon={['fab', 'reddit']} className="header_font-awesome-icon" />

          <h1 className="header_title">Reddit<span className="header_title-span">Sample</span></h1>
        </div>
      </div>
      
      <div className="header_nav-container">
        <Nav />
      </div>

      <SideNav />
    </div>
  )
}

export default Header;