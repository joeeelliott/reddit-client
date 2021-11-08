import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hideArticle } from '../features/articleSlice';

const Hide = ({ id, hidden, articles, articleType }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    articles.forEach(item => {
      if(item.id === id) {
        if(!item.hidden){  // if article not hidden
          dispatch(hideArticle({ id, articleType })); 
        }
      }
    });
  }

  return (
    <div className="article_hide-container" onClick={handleClick}>
      <div className="article_hide-icon-container">
        <FontAwesomeIcon className="article_hide-icon" icon={['far', 'eye-slash']} />
      </div>

      <p className="article_hide-text">Hide</p>
    </div>
  )
}

export default Hide;