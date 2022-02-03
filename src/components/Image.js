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
      <button onClick={handleClick}>
      <img 
        src={thumbnail.url} 
        height={thumbnail.height} 
        width={thumbnail.width} 
        alt="Associated to post" 
        className="post_post-img" 
        // onClick={handleClick}
      ></img>
      </button>

      {imgClicked && 
        <div className="post_img-modal">
          <img 
            tabIndex="0"
            src={thumbnail.url} 
            height={thumbnail.height * 1.5} 
            width={thumbnail.width * 1.5} 
            alt="Associated to post" 
            className="post_post-img-clicked"
          ></img>

          <button onClick={handleClick}>
          <FontAwesomeIcon 
            aria-hidden="true"
            aria-label="Minimize image"
            className="post_img-modal-close-icon" 
            icon={['fas', 'times']} 
            // onClick={handleClick} 
          />
          </button>
        </div>
      }
    </div>
  )
}

export default Image;