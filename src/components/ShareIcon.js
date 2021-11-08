import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareIcon = () => {
  return (
    <div className="article_share-icon-container">
      <FontAwesomeIcon className="article_share-icon" icon="share" />
      <p className="article_api-data">Share</p>
    </div>
  )
}

export default ShareIcon;