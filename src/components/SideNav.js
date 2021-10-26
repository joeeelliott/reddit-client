import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav, eyeClicked, resetEyeClicked } from '../features/sideNavSlice';

import { selectInitialState } from '../features/articleSlice';

const SideNav = () => {
  const sideNavState = useSelector(selectShowSideNav);
  const articleState = useSelector(selectInitialState); 
  // console.log(sideNavState.sideNavHidden); 
  const dispatch = useDispatch();

  // useEffect is effective when an action/state change in this component is required via another components state change. Redux store allows all Components' state to be shared, and we access it via export/import of state and reducers, and useSelector() to save these to variables. Here we access a specific state from articleSlice and depending on what that state is, useEffect() will perform an action automatically when a state changes (in this case the allArticlesShown state in articleSlice). We can then dispatch an action related to this components state to alter something in this component. useEffect makes it easy to perform actions on current component using the state of any slice. 
  useEffect(() => {  
    if(articleState.articles.allArticlesShown) {  // if all articles are shown (the eye is clicked)... 
      dispatch(resetEyeClicked());  // ... reset eyeClicked back to false
    }
  }, [articleState.articles.allArticlesShown])  // only execute if allArticlesShown changes, - note our if() only allows execution if allArticlesShown is true. 

  const handleEyeMouseOver = (e) => {
    e.currentTarget.parentNode.parentNode.children[0].children[0].classList.add('sideNav_eye-icon-hover-text-show');   // executes animation of text

    e.currentTarget.parentNode.parentNode.children[0].children[0].style.opacity = '1.0';   // keeps text visible on mouseover

    if(!articleState.articles.allArticlesShown) {
      e.currentTarget.parentNode.parentNode.children[0].children[0].innerHTML = 'Show hidden articles';   // text if all articles aren't shown
    }
  }

  const handleEyeMouseOut = (e) => {
    e.currentTarget.parentNode.parentNode.children[0].children[0].classList.remove('sideNav_eye-icon-hover-text-show');  // removes text on mouseout

    e.currentTarget.parentNode.parentNode.children[0].children[0].style.opacity = '0';   // resets opacity back to 0 after changing it on mouseover. 

    e.currentTarget.parentNode.parentNode.children[0].children[0].innerHTML = 'Show hidden articles';  // resets text on mouseout
  }

  const handleEyeClick = (e) => {
    if(articleState.articles.allArticlesShown) {
      e.currentTarget.parentNode.parentNode.children[0].children[0].innerHTML = 'No articles hidden';   // text if no hidden articles
    } else {
      dispatch(eyeClicked());
      e.currentTarget.parentNode.parentNode.children[0].children[0].innerHTML = 'Articles unhidden';   // text if allArticlesShown = true 
    }
  }

  return (
    // <div role="sideNav-outer-div"> 
    // className={sideNavState.toggleSideNav ? "sideNav_show-nav" : "sideNav_hide-nav"}  ---> was inside below div with id sideNav
      <div id="sideNav" className="sideNav_sideNav" > 
        <form>
          <label>Search: </label>
          <input type="text" placeholder="Search term here..." />
          <label>Filter: </label>
          <select id="filters" name="filters">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>

          <FontAwesomeIcon data-testid="filter-icon" icon="filter" data-test-header_filter-icon data-test-header_font-awesome-icon aria-hidden="true" />

          <div className="sideNav_btn-container">
            <button className="sideNav_btn" >Confirm</button>
            {/* onClick={showSideNav} will need to close sideNav when button clicked */}
          </div>
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