import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectInitialState, toggleEllipsis } from '../features/postSlice';

import EllipsisDropDown from './EllipsisDropDown';

const Ellipsis = ({ id, saved, hidden, reported, postType }) => {
  const dispatch = useDispatch();
  const initialState = useSelector(selectInitialState);

  const handleClick = (e) => {
    if(!initialState.posts.ellipsisClicked){   // if ellipsis not clicked, toggle state to true
      dispatch(toggleEllipsis());
    } else {  // else toggle to false
      dispatch(toggleEllipsis()); 
    }
    
    e.currentTarget.children[1].classList.toggle('post_ellipsis-dropdown-show');   // opens dropdown of clicked ellipsis post 

    const openEllipsisPosts = document.getElementsByClassName('post_ellipsis-dropdown-show'); // array of each post which has ellipsis dropdown open
    for(let i = 0; i < openEllipsisPosts.length; i++){  // iterate through the posts with ellipsis dropdown open
      if(openEllipsisPosts[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id !== id){  // if the id of post in array doesn't match the id of clicked ellipsis post...
        openEllipsisPosts[i].classList.remove  ('post_ellipsis-dropdown-show');  // ...remove the dropdown
      }     
    }
  }

  return (
    <div className="post_ellipsis-container" onClick={handleClick}>
      <FontAwesomeIcon 
        aria-hidden="true"
        aria-label="View ellipsis dropdown box"
        className="post_ellipsis-icon" 
        icon="ellipsis-h" 
      />

      <EllipsisDropDown 
        id={id} 
        saved={saved} 
        hidden={hidden} 
        reported={reported} 
        postType={postType} 
      />
    </div> 
  )
}

export default Ellipsis;