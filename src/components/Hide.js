import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hidePost } from '../features/postSlice';

const Hide = ({ id, hidden, postType }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(hidePost({ id, postType })); 
  }

  return (
    <div className={hidden ? "post_hide-container-clicked" : "post_hide-container"} onClick={handleClick}>
      <div className="post_hide-icon-container">
        <FontAwesomeIcon 
          aria-hidden="true"
          aria-label="Hide this post"
          className="post_hide-icon" 
          icon={['far', 'eye-slash']}
        />
      </div>

      <p className="post_hide-text">{hidden ? 'Hidden' : 'Hide'}</p>
    </div>
  )
}

export default Hide;