import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { imgToggle } from '../features/articleSlice'; 

const Image = ({ id, thumbnail, imgClicked, articleType }) => {
  const dispatch = useDispatch(); 
  
  const handleClick = (e) => {
    dispatch(imgToggle({ id, articleType }));
  }

  return (
    <div className="article_img-container">
      <img src={thumbnail.url} height={thumbnail.height} width={thumbnail.width} alt="Img..." className="article_article-img" onClick={handleClick}></img>

      {imgClicked && 
        <div className="article_img-modal">
          <img src={thumbnail.url} height={thumbnail.height * 1.5} width={thumbnail.width * 1.5} alt="Img..." className="article_article-img-clicked"></img>
          <FontAwesomeIcon className="article_img-modal-close-icon" icon={['fas', 'times']} onClick={handleClick} />
        </div>
      }
    </div>
  )
}

export default Image;