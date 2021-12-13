import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { imgToggle } from '../features/postSlice'; 

const Image = ({ id, thumbnail, imgClicked, postType }) => {
  const dispatch = useDispatch(); 
  
  const handleClick = (e) => {
    dispatch(imgToggle({ id, postType }));
  }

  return (
    <div className="post_img-container">
      <img src={thumbnail.url} height={thumbnail.height} width={thumbnail.width} alt="Img..." className="post_post-img" onClick={handleClick}></img>

      {imgClicked && 
        <div className="post_img-modal">
          <img src={thumbnail.url} height={thumbnail.height * 1.5} width={thumbnail.width * 1.5} alt="Img..." className="post_post-img-clicked"></img>
          <FontAwesomeIcon className="post_img-modal-close-icon" icon={['fas', 'times']} onClick={handleClick} />
        </div>
      }
    </div>
  )
}

export default Image;