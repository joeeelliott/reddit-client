import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareIcon = () => {
  return (
    <div className="post_share-icon-container">
      <FontAwesomeIcon className="post_share-icon" icon="share" />
      <p className="post_api-data">Share</p>
    </div>
  )
}

export default ShareIcon;