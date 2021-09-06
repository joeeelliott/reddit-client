import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import mockImg from '../images/mockpic.png';

import { fetchArticles, selectArticle, selectArticleIsLoading } from '../features/articleSlice'; 

const Article = () => {
  const articles = useSelector(selectArticle);
  const articlesLoading = useSelector(selectArticleIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  // console.log(articlesLoading);

  const abbrScore = num => {
    const string = num.toString(); 
    const numLength = num.toString().length; 

    if(numLength <= 3) {
      return num;
    } else if(numLength > 3) {
      if(numLength === 4) {
        return `${string.substring(0, 1)}.${string.substring(1, 2)}K`;
      } else if(numLength === 5) {
        return `${string.substring(0, 2)}.${string.substring(2, 3)}K`; 
      } else if(numLength === 6){
        return `${string.substring(0, 3)}K`; 
      }
    }
  }

  // console.log(abbrScore(66666))

  return (
    <div role="outer-div">

      <div role="article-div" className="article_article-div">
        <div role="left-sided-column" className="article_comments-column">
          <p role="comments-total" className="article_total-comments">{articlesLoading ? 'Data loading...' : abbrScore(articles[0].score)}</p>
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
