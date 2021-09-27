import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
// import mockImg from '../images/mockpic.png';

import { abbrNum, convertUnixTimeStamp } from '../utils';

import { fetchPopularArticles, fetchTrendingArticles, fetchSportArticles, fetchNewsArticles, selectPopularArticle, selectTrendingArticle, selectSportArticle, selectnewsArticle,  selectPopularArticleWithThumbnails, selectPopularArticleWithoutThumbnails, selectPopularArticleIsLoading, selectTrendingArticleIsLoading, selectSportArticleIsLoading, selectNewsArticleIsLoading, selectDataIsLoading } from '../features/articleSlice'; 


const Article = () => {
  const popularArticles = useSelector(selectPopularArticle);
  // const trendingArticles = useSelector(selectTrendingArticle);
  // const sportArticles = useSelector(selectSportArticle);
  // const newsArticles = useSelector(selectnewsArticle);

  // const popularArticlesWithThumbnails = useSelector(selectPopularArticleWithThumbnails);
  // const popularArticlesrWithoutThumbnails = useSelector(selectPopularArticleWithoutThumbnails);

  // const popularArticlesLoading = useSelector(selectPopularArticleIsLoading);
  // const trendingArticleLoading = useSelector(selectTrendingArticleIsLoading);
  // const sportArticlesLoading = useSelector(selectSportArticleIsLoading);
  // const newsArticlesLoading = useSelector(selectNewsArticleIsLoading);

  const dataLoading = useSelector(selectDataIsLoading);
  
  const dispatch = useDispatch();

  useEffect(() => {
    popularArticles.length === 0 &&  // prevents from fetching 10 more articles each re-render, only runs if no data is stored
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
      
      {!dataLoading && popularArticles.map(article => ( 
        <div className="article_article-div" key={article.id}>
        <div className="article_score-column">
          <p className="article_score">{abbrNum(article.score)}</p>
        </div>
        <div className="article_main-content-div">
          <h1 className="article_title">{article.title}</h1>

          {article.thumbnail.url.includes('https') && <div className="article_article-img-div">
            <img src={article.thumbnail.url} height="100%" width="100%" alt="Data loading..." className="article_article-img"></img>
          </div>}

          <div className="article_article-details-div">
            <p className="article_article-detail">Posted By: <strong>{article.author}</strong></p>
            <p className="article_article-detail">{convertUnixTimeStamp(article.created)}</p>
            <p className="article_article-detail">{`${abbrNum(article.numComments)} comments`}</p>
          </div>
        </div>
      </div>
      )
      )}        

        {/* <div className="article_article-div">
          <div className="article_comments-column">
            <p className="article_total-comments">{popularArticlesLoading ? 'Data loading...' : abbrNum(popularArticles[0].score)}</p>
          </div>
          <div className="article_main-content-div">
            <h1 className="article_title">{popularArticlesLoading ? 'Data loading...' : popularArticles[0].title}</h1>
            <div className="article_article">
              <img src={popularArticlesLoading ? mockImg : popularArticles[0].thumbnail.url} height="100%" width="100%" alt="Data loading..." className="article_article-img"></img>
            </div>

            <div className="article_article-details-div">
              <p className="article_article-detail">Posted By: <strong>{popularArticlesLoading ? 'Data loading...' : popularArticles[0].author}</strong></p>
              <p className="article_article-detail">{popularArticlesLoading ? 'Data loading...' : convertUnixTimeStamp(popularArticles[0].created)}</p>
              <p className="article_article-detail">{popularArticlesLoading ? 'Data loading...' : `${abbrNum(popularArticles[0].numComments)} comments`}</p>
            </div>
          </div>
        </div> */}
        
    </div>
  )
}

export default Article;