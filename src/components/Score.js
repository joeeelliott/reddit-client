import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { abbrNum } from '../utils';
import { scorePost } from '../features/postSlice';

const Score = ({ id, postType, score, scoredUp, scoredDown }) => {
  const dispatch = useDispatch(); 

  const handleClick = (e) => {
    let scored; 
    e.currentTarget.classList.contains('fa-arrow-up') ? scored = 'up' : scored = 'down';

    // classes again set colors based on state, as if class changes executed in here, they only activate on click - they dont stay based on state when clicking between Route paths. 

    dispatch(scorePost({ postType, id, scored }));
  }

  return (
    <div className="post_score-container">
      <FontAwesomeIcon 
        aria-hidden="true"
        aria-label="Upvote the post"
        className={scoredUp ? "post_score-up-icon-clicked" : "post_score-icon"}
        icon="arrow-up" 
        onClick={handleClick} 
      /> 
      <p className="post_score">{abbrNum(score)}</p>
      <FontAwesomeIcon 
        aria-hidden="true"
        aria-label="Downvote the post"
        className={scoredDown ? "post_score-down-icon-clicked" : "post_score-icon"} 
        icon="arrow-down" 
        onClick={handleClick} 
      /> 
    </div>
  )
}

export default Score;