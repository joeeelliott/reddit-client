import React from 'react';

import Score from './Score'; 
import TopRow from './TopRow'; 
import Title from './Title';
import CommentsIcon from './CommentsIcon';
import ShareIcon from './ShareIcon';
import Ellipsis from './Ellipsis';
import ReportModal from './ReportModal';

const Article = ({ id, score, author, created, title, numComments, saved, thumbnail, articles, articleType, scoredUp, scoredDown, hidden, reported }) => {

  return (
    <div className={hidden ? "article_outer-container-hide" : "article_outer-container"} id={id}>
      <Score id={id} articleType={articleType} score={score} currentArticles={articles} scoredUp={scoredUp} scoredDown={scoredDown} />
      <div className="article_main-content-container">
        <TopRow author={author} created={created} /> 

        <div className="article_title-bottom-details-img-container">
          <div className="article_title-bottom-details-container">
            <Title title={title} />
            <div className="article_bottom-details-container">
              <CommentsIcon numComments={numComments} />
              <ShareIcon />
              <Ellipsis id={id} saved={saved} hidden={hidden} reported={reported} articles={articles} articleType={articleType} />
            </div>
          </div>

          {thumbnail.url.includes('https') && <div className="article_img-container">
            <img src={thumbnail.url} height={thumbnail.height} width={thumbnail.width} alt="Img..." className="article_article-img"></img>
          </div>}
        </div>
      </div>

      {reported && <ReportModal reported={reported} />}
    </div>
  )
}

export default Article;