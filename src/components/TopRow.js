import React from 'react';

import { convertUnixTimeStamp } from '../utils';

const TopRow = ({ author, created, permalink }) => {
  return (
    <div className="post_details-top-container">
      <div className="post_post-details">
        <p className="post_api-data">Posted by <span className="strong">{author}</span></p>
        <p className="post_api-data">{convertUnixTimeStamp(created)}</p>
      </div>
      <div className="post_link-btn">
        <a href={permalink} target="_blank" rel="noreferrer noopener" className="post_permalink">
          <p className="post_link-btn-text"><strong>View post</strong></p>
        </a>
      </div>
    </div>
  )
}

export default TopRow;