import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { abbrNum } from '../utils';

const CommentsIcon = ({ numComments }) => {
  return (
    <div className="article_comments-icon-container">
      <FontAwesomeIcon className="article_comments-icon" icon={['far', 'comment-alt']} />
      <p className="article_api-data">{`${abbrNum(numComments)}`} Comments</p>
  </div>
  )
}

export default CommentsIcon;