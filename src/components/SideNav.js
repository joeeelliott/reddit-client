import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'; 

import { selectShowSideNav } from '../features/sideNavSlice';
import { selectInitialPostsState, searchPosts, userSearch, userNoSearch, showPosts, searchedPostsFound } from '../features/postSlice';

import PostFilters from './PostFilters'; 
import SpecificsFilters from './SpecificsFilters'; 

const SideNav = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(""); 

  const sideNavState = useSelector(selectShowSideNav);
  const postState = useSelector(selectInitialPostsState);
  const isSearching = postState.isSearching; 
  
  const handleEyeMouseOver = (e) => {
    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].classList.add('sideNav_eye-icon-hover-text-show');    // executes animation 

    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].style.opacity = '1.0';   // keeps text visible whilst mouseover

    if(!postState.allPostsShown) {   // if there are hidden posts...
      document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'Show hidden posts';   // ... change text
    }
  }

  const handleEyeMouseOut = (e) => {
    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].classList.remove('sideNav_eye-icon-hover-text-show');  // removes text

    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].style.opacity = '0';     // 0 opacity

    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'Show hidden posts';    // resets original text
  }

  const handleEyeClick = (e) => {
    if(postState.allPostsShown) {  // if no hidden posts
      document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'No posts hidden';
    } else {  // if there are hidden posts
      dispatch(showPosts());    // show all hidden posts
      document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'Posts unhidden';
    }
  }
  
  useEffect(() => {
    // console.log(searchText); 
    dispatch(searchPosts({ searchText }));   // executed in here as if executed in the handleChange, the userSearch string state is one letter behind what's in the search bar, so the search isn't accurate to what is in user search bar. 
  }, [searchText, dispatch]);

  useEffect(() => {
    !isSearching && setSearchText(""); 
    if(!searchText){
      dispatch(userNoSearch());
      dispatch(searchedPostsFound({ ids: undefined, text: searchText }));   // reset searchedPosts state array 
    }
  }, [dispatch, searchText, isSearching]);

  const search = postState.searchText;
  
  useEffect(() => {
    if(isSearching){
      dispatch(searchedPostsFound());
    }
  }, [dispatch, isSearching, search]);   // each time the searchText state changes in the store - not local state as that's always one change behind

  const handleChange = (e) => {
    setSearchText(e.currentTarget.value);
    if(e.currentTarget.value){
      dispatch(userSearch());
    } else {
      dispatch(userNoSearch());
    }
  }

  return (
    <div id="sideNav" className="sideNav_sideNav"> 
      <form className={!sideNavState.toggleSideNav ?"sideNav_hide-form" : undefined}>
        <label className="sideNav_primary-label">Search: </label>
        <input className="sideNav_search-input" type="text" value={searchText} placeholder="Enter search term here..." onChange={handleChange} />
          
        <label className="sideNav_primary-label">Filter By: </label>

        <label className="sideNav_primary-label"><strong>Posts</strong></label>

        <PostFilters />

        <label className="sideNav_primary-label"><strong>Post Specifics</strong></label>

        <SpecificsFilters />

      </form>

      <div className="sideNav_eye-text-container">
        <div className="sideNav_text-container">
          <p className="sideNav_eye-icon-hover-text">Show hidden posts</p>
        </div>
        <div className="sideNav_eye-icon-container">
          <button 
            type="button" 
            aria-label="Restore any hidden posts back to the timeline" 
            onClick={handleEyeClick}
          >
            <FontAwesomeIcon 
              className="sideNav_eye-icon" 
              icon={['far', 'eye']} 
              onMouseOver={handleEyeMouseOver} 
              onMouseOut={handleEyeMouseOut} 
                // onClick={handleEyeClick} 
            />
          </button>
        </div>            
      </div>
    </div>
  )
}

export default SideNav;