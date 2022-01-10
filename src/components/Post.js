import React from 'react';
import { useSelector } from 'react-redux';

import Score from './Score'; 
import TopRow from './TopRow'; 
import Title from './Title';
import CommentsIcon from './CommentsIcon';
import ShareIcon from './ShareIcon';
import Ellipsis from './Ellipsis';
import Image from './Image'; 
import ReportModal from './ReportModal';

import { selectInitialState } from '../features/postSlice';
const Post = ({ id, score, author, created, title, numComments, saved, thumbnail, permalink, posts, postType, scoredUp, scoredDown, hidden, reported, imgClicked }) => {

  const initialState = useSelector(selectInitialState);
  const filterMode = initialState.posts.filterMode; 
  const filter = initialState.posts.postFilter.toLowerCase(); 

  const classNameIs = (hidden, filterMode, filter, postType) => {
    if(hidden && !filterMode){  // if hidden and filterMode is OFF 
      return "post_outer-container-hide";
    } else if(hidden && filterMode && filter === postType){  // if hidden, and filterMode is ON, and user filters to the post type (e.g. popular) that the post belongs to, it doesn't appear on screen.
      return "post_outer-container-hide";
    } else if(hidden && filterMode && filter === 'all'){   // if hidden, and filterMode is ON, and user filters to All posts, the post doesn't appear on screen
      return "post_outer-container-hide";
    } else {  // else the post appears on screen
      return "post_outer-container"; 
    }
  }
  
  return (
    <div className={classNameIs(hidden, filterMode, filter, postType)} id={id}>
      <Score id={id} postType={postType} score={score} scoredUp={scoredUp} scoredDown={scoredDown} />
      <div className="post_main-content-container">
        <TopRow author={author} created={created} permalink={permalink} /> 

        <div className="post_title-bottom-details-img-container">
          <div className="post_title-bottom-details-container">
            <Title title={title} />
            <div className="post_bottom-details-container">
              <CommentsIcon numComments={numComments} />
              <ShareIcon />
              <Ellipsis id={id} saved={saved} hidden={hidden} reported={reported} postType={postType} />
            </div>
          </div>

          {thumbnail.url.includes('https') && <Image id={id} thumbnail={thumbnail} imgClicked={imgClicked} postType={postType} />}
        </div>
      </div>

      {reported && <ReportModal reported={reported} />}
    </div>
  )
}

export default Post;