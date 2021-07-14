import React from 'react';

import SideNav from './SideNav'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faReddit } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';


const Header = () => {
  const sideNavState = useSelector(selectShowSideNav)
  // console.log(sideNavState.sideNavHidden); 
  const dispatch = useDispatch(); 

  const handleShowSideNavClick = () => {
    console.log('handleShowSideNavClick'); 
    dispatch(showSideNav)
  }

  // const showSideNav = (e) => {
  //   // console.log(e.currentTarget); 
  //   // console.log(e.target); 
  //   // e.currentTarget.classList.toggle("Header_show-nav-bar");
  //   console.log(sideNavState.sideNavHidden);
  //   console.log(sideNavState.sideNavIconClicked);
  //   sideNavState.sideNavIconClicked = !sideNavState.sideNavIconClicked
  //   // console.log(sideNavState.sideNavIconClicked);
  // }

  return (
    <div className="Header_header">
      <div className="Header_toggle-btn-container">
        <FontAwesomeIcon icon="bars" className="Header_bars-icon Header_font-awesome-icon" onClick={handleShowSideNavClick} />
      </div>

      <div className="Header_logo-title-container">
        <FontAwesomeIcon icon={['fab', 'reddit']} className="Header_reddit-icon Header_font-awesome-icon" />

        <h1 className="Header_title">Reddit<span className="Header_title-span">Sample</span></h1>
      </div>

      <SideNav />
    </div>
  )
}

export default Header;