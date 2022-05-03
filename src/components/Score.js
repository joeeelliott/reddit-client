import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { abbrNum } from '../utils';
import { scorePost } from '../features/postSlice';

const Score = ({ id, postType, score, scoredUp, scoredDown }) => {

  const dispatch = useDispatch(); 

  const handleClick = (e) => {
    let scored; 
    // console.log(e.currentTarget.children[0])
    e.currentTarget.children[0].classList.contains('fa-arrow-up') ? scored = 'up' : scored = 'down';

    // classes again set colors based on state, as if class changes executed in here, they only activate on click - they dont stay based on state when clicking between Route paths. 

    dispatch(scorePost({ postType, id, scored }));
  }

  return (
    <div className="post_score-container">
      <button 
        type="button" 
        aria-label="Upvote the post"
        onClick={handleClick}
      >
        <FontAwesomeIcon 
          className={scoredUp ? "post_score-up-icon-clicked" : "post_score-icon"}
          icon="arrow-up" 
        /> 
      </button>
      <p className="post_score">{abbrNum(score)}</p>
      <button 
        type="button" 
        aria-label="Downvote the post"
        onClick={handleClick}
      >
        <FontAwesomeIcon 
          className={scoredDown ? "post_score-down-icon-clicked" : "post_score-icon"} 
          icon="arrow-down"  
        /> 
      </button>
    </div>
  )
}

export default Score;