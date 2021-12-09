import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';

import { selectInitialState, searchArticles, userSearch, userNoSearch, showArticles, searchedArticlesFound } from '../features/articleSlice';

import PostFilters from './PostFilters'; 
import SpecificsFilters from './SpecificsFilters'; 

const SideNav = () => {
  const sideNavState = useSelector(selectShowSideNav);
  const articleState = useSelector(selectInitialState); 
  // console.log(sideNavState.sideNavHidden); 
  // console.log(articleState.articles.liveArticles); 
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  // useEffect is effective when an action/state change in this component is required via another components state change. Redux store allows all Components' state to be shared, and we access it via export/import of state and reducers, and useSelector() to save these to variables. Here we access a specific state from articleSlice and depending on what that state is, useEffect() will perform an action automatically when a state changes (in this case the allArticlesShown state in articleSlice). We can then dispatch an action related to this components state to alter something in this component. useEffect makes it easy to perform actions on current component using the state of any slice. 

  const handleEyeMouseOver = (e) => {
    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].classList.add('sideNav_eye-icon-hover-text-show');    // executes animation 

    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].style.opacity = '1.0';   // keeps text visible whilst mouseover

    if(!articleState.articles.allArticlesShown) {   // if there are hidden articles...
      document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'Show hidden articles';   // ... change text
    }
  }

  const handleEyeMouseOut = (e) => {
    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].classList.remove('sideNav_eye-icon-hover-text-show');  // removes text

    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].style.opacity = '0';     // 0 opacity

    document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'Show hidden articles';    // resets original text
  }

  const handleEyeClick = (e) => {
    if(articleState.articles.allArticlesShown) {  // if no hidden articles
      document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'No articles hidden';
    } else {  // if there are hidden articles
      // dispatch(eyeClicked());
      dispatch(showArticles());    // show all 
      document.getElementsByClassName('sideNav_eye-icon-hover-text')[0].innerHTML = 'Articles unhidden';
    }
  }

  const isSearching = articleState.articles.isSearching;
  
  useEffect(() => {
    // console.log(searchText); 
    dispatch(searchArticles({ searchText }));   // executed in here as if executed in the handleChange, the userSearch string state is one letter behind what's in the search bar, so the search isn't accurate to what is in user search bar. 
  }, [searchText]);    

  useEffect(() => {
    !isSearching && setSearchText(""); 
    if(!searchText){
      dispatch(userNoSearch());
      dispatch(searchedArticlesFound({ ids: undefined, text: searchText }));   // reset searchedArticles state array 
    }
  }, [isSearching]);

  const search = articleState.articles.searchText;
  useEffect(() => {
    if(isSearching){
      dispatch(searchedArticlesFound());
    }
  }, [search]);   // each time the searchText state changes in the store - not local state as that's always one change behind

  const handleChange = (e) => {
    setSearchText(e.currentTarget.value);
    if(e.currentTarget.value){
      dispatch(userSearch());
    } else {
      dispatch(userNoSearch());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchArticles({ searchText })); 
  }

  return (
    // <div role="sideNav-outer-div"> 
    // className={sideNavState.toggleSideNav ? "sideNav_show-nav" : "sideNav_hide-nav"}  ---> was inside below div with id sideNav
      <div id="sideNav" className="sideNav_sideNav" > 
        <form className={!sideNavState.toggleSideNav ?"sideNav_hide-form" : undefined}>
          <label className="sideNav_primary-label">Search: </label>
          <input className="sideNav_search-input" type="text" value={searchText} placeholder="Enter search term here..." onChange={handleChange} />
          
          <label className="sideNav_primary-label">Filter By: </label>
          
          {/* <select id="filters" name="filters">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select> */}
          <label className="sideNav_primary-label"><strong>Posts</strong></label>

          <PostFilters />

          <label className="sideNav_primary-label"><strong>Post Specifics</strong></label>

          <SpecificsFilters />

          {/* <div className="sideNav_btn-container">
            <button className="sideNav_btn" onClick={handleSubmit}><FontAwesomeIcon data-testid="filter-icon" icon="filter" data-test-header_filter-icon data-test-header_font-awesome-icon aria-hidden="true" /></button>
            {/* onClick={showSideNav} will need to close sideNav when button clicked */}
          {/* </div> */}
        </form>

        <div className="sideNav_eye-text-container">
          <div className="sideNav_text-container">
            <p className="sideNav_eye-icon-hover-text">Show hidden articles</p>
          </div>
          <div className="sideNav_eye-icon-container">
            <FontAwesomeIcon className="sideNav_eye-icon" icon={['far', 'eye']} onMouseOver={handleEyeMouseOver} onMouseOut={handleEyeMouseOut} onClick={handleEyeClick} />
          </div>            
        </div>
      </div>
    // </div>
  )
}

export default SideNav;