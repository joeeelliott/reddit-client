import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertUnixTimeStamp } from '../utils';

const TopRow = ({ author, created }) => {
  return (
    <div className="post_details-top-container">
      <div className="post_post-details">
        <p className="post_api-data">Posted by <span className="strong">{author}</span></p>
        <p className="post_api-data">{convertUnixTimeStamp(created)}</p>
      </div>
      <div className="post_join-btn">
        <FontAwesomeIcon className="post_join-icon" icon="plus" />
        <p className="post_join-btn-text"><strong>Join</strong></p>
      </div>
    </div>
  )
}

export default TopRow;