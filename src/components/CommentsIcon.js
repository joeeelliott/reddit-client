import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { abbrNum } from '../utils';

const CommentsIcon = ({ numComments }) => {
  return (
    <button className="post_comments-icon-container">
      <FontAwesomeIcon 
        aria-hidden="true"
        aria-label="View comments section"
        className="post_comments-icon" 
        icon={['far', 'comment-alt']} 
      />
      <p className="post_api-data">{`${abbrNum(numComments)}`} Comments</p>
    </button>
  )
}

export default CommentsIcon;