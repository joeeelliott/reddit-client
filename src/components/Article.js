import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import mockImg from '../images/mockpic.png';

import { fetchArticles, testFetchArticles, selectArticle, selectArticleIsLoading } from '../features/articleSlice'; 

const Article = () => {
  const articles = useSelector(selectArticle);
  const articlesLoading = useSelector(selectArticleIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchArticles());
    dispatch(fetchArticles('https://www.reddit.com/r/popular.json?limit=10'));
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
    <div>

      <div className="article_article-div">
        <div className="article_comments-column">
          <p className="article_total-comments">{articlesLoading ? 'Data loading...' : abbrScore(articles[0].score)}</p>
        </div>
        <div className="article_main-content-div">
          <h1 className="article_title">Article Title</h1>
          <div className="article_article">
            <img src={mockImg} alt="" className="article_article-img"></img>
          </div>

          <div className="article_article-details-div">
            <p className="article_article-detail">Posted By: Joe Elliott</p>
            <p className="article_article-detail">2hrs ago</p>
            <p className="article_article-detail">22.2k comments</p>
          </div>
        </div>
      </div>

      <div className="article_article-div">
        <div className="article_comments-column">
          <p className="article_total-comments">{articlesLoading ? 'Data loading...' : abbrScore(articles[9].score)}</p>
        </div>
        <div className="article_main-content-div">
          <h1 className="article_title">Article Title</h1>
          <div className="article_article">
            <img src={mockImg} className="article_article-img"></img>
          </div>

          <div className="article_article-details-div">
            <p className="article_article-detail">Posted By: Joe Elliott</p>
            <p className="article_article-detail">2hrs ago</p>
            <p className="article_article-detail">22.2k comments</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Article;