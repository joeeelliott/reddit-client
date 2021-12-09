import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hideArticle, showArticle } from '../features/articleSlice';

const Hide = ({ id, hidden, articles, articleType }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(hideArticle({ id, articleType })); 
  }

  return (
    <div className={hidden ? "article_hide-container-clicked" : "article_hide-container"} onClick={handleClick}>
      <div className="article_hide-icon-container">
        <FontAwesomeIcon className="article_hide-icon" icon={['far', 'eye-slash']} />
      </div>

      <p className="article_hide-text">{hidden ? 'Hidden' : 'Hide'}</p>
    </div>
  )
}

export default Hide;