import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addSavedArticle, removeSavedArticle } from '../features/articleSlice';

const Save = ({ id, saved, articles }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    const link = document.getElementsByClassName('nav_link')[3].children[0];   // accesses the 'Saved' nav link 
    articles.forEach(item => {
      if(item.id === id) {
        if(!item.saved){  // if article not saved
          link.classList.add('nav_saved-article-animation');
          dispatch(addSavedArticle({ id, articleType: item.articleType })); 
                
          setTimeout(() => link.classList.remove('nav_saved-article-animation'), 1100); // ensures it's auto removed so we can repeat animation for each article
        } else {         // else if article is saved
          dispatch(removeSavedArticle({ id, articleType: item.articleType })); 
        }  
      }
    });
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