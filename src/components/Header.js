import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SideNav from './SideNav'; 
import Nav from './Nav'; 
import { showSideNav } from '../features/sideNavSlice';
import { selectInitialPostsState, userNoSearch, userNoFilter, selectToggleSideNav } from '../features/postSlice';

const Header = () => {
  // const sideNavState = useSelector(selectShowSideNav);
  const postState = useSelector(selectInitialPostsState); 
  const toggleSideNav = useSelector(selectToggleSideNav)

  const dispatch = useDispatch();

  // if sidenav is open, add event listener to document that when anywhere other than sidenav or search icon is clicked, it executes sideNavDocumentEventListener. Only executes on change of toggleSideNav. 
  useEffect(() => {
    const searchIcon = document.getElementsByClassName('header_search-icon');   // access icon
    const sidenav = document.getElementById('sideNav'); 

    if(toggleSideNav){  // if toggle true - sidenav open
      searchIcon[0].classList.add('header_search-icon-rotate'); // add rotation to icon
      document.addEventListener('mouseup', sideNavDocumentEventListener); // add listener to document
      sidenav.classList.add('sideNav_show-nav'); 
    } else {    // else if toggle false - sidenav closed
      searchIcon[0].classList.remove('header_search-icon-rotate');  // rotate icon back 
      document.removeEventListener('mouseup', sideNavDocumentEventListener);
      sidenav.classList.remove('sideNav_show-nav'); 
      sidenav.classList.add('sideNav_hide-nav'); 
    }   
    
    return () => {
      document.removeEventListener('mouseup', sideNavDocumentEventListener); 
    }
  });

  // when sidenav is open, hide sidenav and change state accordingly when anywhere other than sidenav and search icon clicked. Dont 
  const sideNavDocumentEventListener = (e) => {
    const searchIcon = document.getElementsByClassName('header_search-icon');
    const sidenav = document.getElementById('sideNav'); 

    if(sidenav.contains(e.target)) {  // if we click on any part of the sidenav 
      const eTargetParentNode = e.target.parentNode;
      const eTargetParentNodeParentNode = e.target.parentNode.parentNode;
      const eyeIcon = document.getElementsByClassName('sideNav_eye-icon')[0];
      const path = eyeIcon.children[0];
      
      if(e.target === eTargetParentNode || e.target === eyeIcon || e.target === eTargetParentNodeParentNode || e.target === path){   // several targets can be clicked depending on which specific part of the eye you click on... so to cover every one, if we click on any part of the eye execute following...
        if(!postState.allPostsShown){  // if all posts not shown, execute following - dont want to go off sidenav on eye click if all posts are shown. 
          searchIcon[0].classList.remove('header_search-icon-rotate');  // rotate icon back 
          sidenav.classList.remove('sideNav_show-nav');// hide sidenav
          sidenav.classList.add('sideNav_hide-nav');// hide sidenav
          dispatch(showSideNav());  // trigger state change back to false
          document.removeEventListener('mouseup', sideNavDocumentEventListener);
          // console.log('hidden sidenav, rotated icon, dispatched change to state, removed listener'); 
        }
      } 
    } else if(!sidenav.contains(e.target) && !searchIcon[0].contains(e.target)){  // if clicked outside of sidenav AND searchIcon
      sidenav.classList.remove('sideNav_show-nav');// hide sidenav
      sidenav.classList.add('sideNav_hide-nav');// hide sidenav
      dispatch(showSideNav());  // trigger state change back to false
      document.removeEventListener('mouseup', sideNavDocumentEventListener);   // remove event listener as not to duplicate. 

    } else if(searchIcon[0].contains(e.target)) {  // else if search icon is clicked 
      document.removeEventListener('mouseup', sideNavDocumentEventListener); 
    }
  }

  const handleShowSideNavClick = (e) => {
    dispatch(showSideNav()); 
  }

  const handleLogoClick = (e) => {
    dispatch(userNoSearch());  
    dispatch(userNoFilter());  
  }

  return (
    <div className="header_header">
      <div className="header_toggle-btn-container">
        <button 
          type="button"
          onClick={handleShowSideNavClick}
          aria-label="Toggle the side navigation menu open and closed"
        >
          <FontAwesomeIcon  
            icon="search" 
            className="header_search-icon header_font-awesome-icon"  
          />
        </button>
      </div>

      <SideNav />

      <div className="header_toggle-and-title-container">
        <div className="header_logo-title-container">
          <Link 
            to="/" 
            className="header_logo-title-link" 
            onClick={handleLogoClick}
          >
            <FontAwesomeIcon 
              data-testid="reddit-icon" 
              aria-hidden="true"
              aria-label="Skip to the home page"
              icon={['fab', 'reddit']}
              className="header_reddit-icon header_font-awesome-icon"
            />
            <h1 className="header_title">Reddit<span className="header_title-span">Sample</span></h1>
          </Link>
        </div>
      </div>
      
      <div className="header_nav-container">
        <Nav />
      </div>
    </div>
  )
}

export default Header;