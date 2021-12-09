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

import { selectInitialState } from '../features/articleSlice';
const Article = ({ id, score, author, created, title, numComments, saved, thumbnail, articles, articleType, allArticles, scoredUp, scoredDown, hidden, reported, imgClicked }) => {

  const initialState = useSelector(selectInitialState);
  const filterMode = initialState.articles.filterMode; 
  const filter = initialState.articles.filteredPosts.toLowerCase(); 

  const classNameIs = (hidden, filterMode, filter, articleType) => {
    if(hidden && !filterMode){  // if hidden and filterMode is OFF 
      return "article_outer-container-hide";
    } else if(hidden && filterMode && filter === articleType){  // if hidden, and filterMode is ON, and user filters to the post type (e.g. popular) that the post belongs to, it doesn't appear on screen.
      return "article_outer-container-hide";
    } else if(hidden && filterMode && filter === 'all'){   // if hidden, and filterMode is ON, and user filters to All posts, the post doesn't appear on screen
      return "article_outer-container-hide";
    } else {  // else the post appears on screen
      return "article_outer-container"; 
    }
  }
  
  return (
    <div className={classNameIs(hidden, filterMode, filter, articleType)} id={id}>
      <Score id={id} articleType={articleType} score={score} currentArticles={articles} scoredUp={scoredUp} scoredDown={scoredDown} />
      <div className="article_main-content-container">
        <TopRow author={author} created={created} /> 

        <div className="article_title-bottom-details-img-container">
          <div className="article_title-bottom-details-container">
            <Title title={title} />
            <div className="article_bottom-details-container">
              <CommentsIcon numComments={numComments} />
              <ShareIcon />
              <Ellipsis id={id} saved={saved} hidden={hidden} reported={reported} articles={articles} articleType={articleType} allArticles={allArticles} />
            </div>
          </div>

          {thumbnail.url.includes('https') && <Image id={id} thumbnail={thumbnail} imgClicked={imgClicked} articleType={articleType} />}
        </div>
      </div>

      {reported && <ReportModal reported={reported} />}
    </div>
  )
}

export default Article;