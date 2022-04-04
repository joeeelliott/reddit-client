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

import { selectFilterMode, selectPostFilter } from '../features/postSlice';

const Post = ({ id, score, author, created, title, numComments, saved, thumbnail, permalink, posts, postType, scoredUp, scoredDown, hidden, reported, imgClicked }) => {

  const filterMode = useSelector(selectFilterMode);
  const selectFilter = useSelector(selectPostFilter);
  const filter = selectFilter && selectFilter.toLowerCase();  // all / popular / sport / news. Only defined when any of these filters are clicked on in sideNav.
  
  return (
    <div className={[classNameIs(hidden, filterMode, filter, postType), `${postType}-post`].join(" ")} id={id}>
      <Score id={id} postType={postType} score={score} scoredUp={scoredUp} scoredDown={scoredDown} />
      <div className="post_main-content-container">
        <TopRow author={author} created={created} permalink={permalink} id={id} /> 

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

export const classNameIs = (hidden, filterMode, filter, postType) => {
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

export default Post;