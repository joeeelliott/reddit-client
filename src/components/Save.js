import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { savePost } from '../features/postSlice';

const Save = ({ id, postType, saved }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(savePost({ id, postType }));
  }

  // below classes are dependant on state 'saved' so that the class doesn't reset when moving between Route paths. If only changed in the post iteration above, they dont save when changing tabs
  return (
    <div className={saved ? 'post_save-container-clicked' : 'post_save-container'} onClick={handleClick}>
      <div  className="post_save-icon-container">
        <FontAwesomeIcon 
          aria-hidden="true"
          aria-label="Save this post"
          className="post_save-icon" 
          icon={['far', 'bookmark']} 
        />
      </div>
                        
      <p className="post_save-text">{saved ? 'Saved' : 'Save'}</p>
    </div>
  )
}

export default Save;