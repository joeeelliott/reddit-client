import React from 'react';
import mockImg from '../images/mockpic.png';

const Article = () => {
  return (
    <div role="outer-div">

      <div role="article-div" className="article_article-div">
        <div role="left-sided-column" className="article_comments-column">
          <p role="comments-total" className="article_total-comments">21.2k</p>
        </div>
        <div role="main-content-div" className="article_main-content-div">
          <h1 role="title" className="article_title">Article Title</h1>
          <div role="article" className="article_article">
            <img src={mockImg} className="article_article-img"></img>
          </div>

          <div role="article-details-div" className="article_article-details-div">
            <p role="article-detail" className="article_article-detail">Posted By: Joe Elliott</p>
            <p role="article-detail" className="article_article-detail">2hrs ago</p>
            <p role="article-detail" className="article_article-detail">22.2k comments</p>
          </div>
        </div>
      </div>

      {/* <div role="article-div" className="article_article-div">
        <div role="left-sided-column" className="article_comments-column">
          <p role="comments-total" className="article_total-comments">21.2k</p>
        </div>
        <div role="main-content-div" className="article_main-content-div">
          <h1 role="title" className="article_title">Article Title</h1>
          <div role="article" className="article_article">

          </div>

          <div role="article-details-div" className="article_article-details-div">
            <p role="article-detail" className="article_article-detail"></p>
            <p role="article-detail" className="article_article-detail"></p>
            <p role="article-detail" className="article_article-detail"></p>
          </div>
        </div>
      </div> */}

    </div>
  )
}

export default Article;
