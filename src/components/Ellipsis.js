import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectInitialState, toggleEllipsis } from '../features/articleSlice';

import EllipsisDropDown from './EllipsisDropDown';


const Ellipsis = ({ id, saved, hidden, reported, articles, articleType }) => {
  const dispatch = useDispatch();
  const initialState = useSelector(selectInitialState);

  const handleClick = (e) => {
    if(!initialState.articles.ellipsisClicked){   // if ellipsis not clicked, toggle state to true
      dispatch(toggleEllipsis());
    } else {
      dispatch(toggleEllipsis()); 
    }
    
    e.currentTarget.children[1].classList.toggle('article_ellipsis-dropdown-show');   // opens dropdown of clicked ellipsis article 
    const currentId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.id;  // id of clicked ellipsis article
    const openEllipsisArticles = document.getElementsByClassName('article_ellipsis-dropdown-show'); // array of each article which has ellipsis dropdown open
    for(let i = 0; i < openEllipsisArticles.length; i++){  // iterate through the articles with ellipsis dropdown open
      if(openEllipsisArticles[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id !== currentId){  // if the id of article in array doesn't match the id of clicked ellipsis article...
        openEllipsisArticles[i].classList.remove  ('article_ellipsis-dropdown-show');  // ...remove the dropdown
      }     
    }
  }

  return (
    <div className="article_ellipsis-container" onClick={handleClick}>
      <FontAwesomeIcon className="article_ellipsis-icon" icon="ellipsis-h" />

      <EllipsisDropDown id={id} saved={saved} hidden={hidden} reported={reported} articles={articles} articleType={articleType} />
    </div> 
  )
}

export default Ellipsis;