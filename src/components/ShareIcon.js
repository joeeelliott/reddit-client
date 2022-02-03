import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareIcon = () => {
  return (
    <button 
      aria-label="Share this post"
      className="post_share-icon-container"
    >
      <FontAwesomeIcon 
        className="post_share-icon" 
        icon="share" 
      />
      <p className="post_api-data">Share</p>
    </button>
  )
}

export default ShareIcon;