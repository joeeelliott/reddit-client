import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { abbrNum, convertUnixTimeStamp } from '../utils';

import { fetchPopularArticles, fetchTrendingArticles, fetchSportArticles, fetchNewsArticles, selectTrendingArticle, selectDataIsLoading } from '../features/articleSlice'; 

const TrendingArticles = () => {
  const trendingArticles = useSelector(selectTrendingArticle);

  const dataLoading = useSelector(selectDataIsLoading);
  
  const dispatch = useDispatch();

  useEffect(() => {
    trendingArticles.length === 0 &&  // prevents from fetching 10 more articles each re-render, only runs if no data is stored
    (async () => {
      await dispatch(fetchPopularArticles());
      await dispatch(fetchTrendingArticles());
      await dispatch(fetchSportArticles());
      await dispatch(fetchNewsArticles());
    })()
    // return () => {
    //   return; 
    // }
  }, []);


  // console.log(popularArticlesWithThumbnails[0].title);

  // console.log((convertUnixTimeStamp(1632145047)));

  return (
    <div>
      
      {!dataLoading && trendingArticles.map(article => ( 
        <div className="article_article-div" key={article.id}>
        <div className="article_score-column">
          <p className="article_score">{abbrNum(article.score)}</p>
        </div>
        <div className="article_main-content-div">
          <h1 className="article_title">{article.title}</h1>

          {/* {article.thumbnail.url.includes('https') && <div className="article_article-img-div">
            <img src={article.thumbnail.url} height="100%" width="100%" alt="Data loading..." className="article_article-img"></img>
          </div>} */}

          <div className="article_article-details-div">
            <p className="article_article-detail">Posted By: <strong>{article.author}</strong></p>
            <p className="article_article-detail">{convertUnixTimeStamp(article.created)}</p>
            <p className="article_article-detail">{`${abbrNum(article.numComments)} comments`}</p>
          </div>
        </div>
      </div>
      )
      )}                
    </div>
  )
}

export default TrendingArticles;
