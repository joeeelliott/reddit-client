import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { abbrNum } from '../utils';
import { scoreArticle } from '../features/articleSlice';

const Score = ({ id, articleType, score, scoredUp, scoredDown, currentArticles }) => {
  const dispatch = useDispatch(); 

  const handleClick = (e) => {
    let scored; 
    e.currentTarget.classList.contains('fa-arrow-up') ? scored = 'up' : scored = 'down';

    // classes again set colors based on state, as if class changes executed in here, they only activate on click - they dont stay based on state when clicking between Route paths. 

    dispatch(scoreArticle({ articles: articleType, id, scored }));
  }

  return (
    <div className="article_score-container">
      <FontAwesomeIcon className={scoredUp ? "article_score-up-icon-clicked" : "article_score-icon"}icon="arrow-up" onClick={handleClick} /> 
      <p className="article_score">{abbrNum(score)}</p>
      <FontAwesomeIcon className={scoredDown ? "article_score-down-icon-clicked" : "article_score-icon"} icon="arrow-down" onClick={handleClick} /> 
    </div>
  )
}

export default Score;