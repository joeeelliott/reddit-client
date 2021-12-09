import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { saveArticle, selectInitialState } from '../features/articleSlice';

const Save = ({ id, articleType, saved, articles, allArticles }) => {
  const dispatch = useDispatch();

  const initialState = useSelector(selectInitialState); 
  const searchedArticlesFound = initialState.articles.searchedArticlesFound;

  const handleClick = (e) => {
    dispatch(saveArticle({ id, articleType }));
  }

  // classes are dependant on state 'saved' (below) so that the class doesn't reset when moving between Route paths. If only changed in the article itartion above, they dont save when changing tabs
  return (
    <div className={saved ? 'article_save-container-clicked' : 'article_save-container'} onClick={handleClick}>
      <div  className="article_save-icon-container">
      <FontAwesomeIcon className="article_save-icon" icon={['far', 'bookmark']} />
      </div>
                        
      <p className="article_save-text">{saved ? 'Saved' : 'Save'}</p>
    </div>
  )
}

export default Save;