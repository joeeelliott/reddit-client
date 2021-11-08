import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertUnixTimeStamp } from '../utils';

const TopRow = ({ author, created }) => {
  return (
    <div className="article_details-top-container">
      <div className="article_post-details">
        <p className="article_api-data">Posted by <span className="strong">{author}</span></p>
        <p className="article_api-data">{convertUnixTimeStamp(created)}</p>
      </div>
      <div className="article_join-btn">
        <FontAwesomeIcon className="article_join-icon" icon="plus" />
        <p className="article_join-btn-text"><strong>Join</strong></p>
      </div>
    </div>
  )
}

export default TopRow;