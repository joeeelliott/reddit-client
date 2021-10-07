import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
// import mockImg from '../images/mockpic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { abbrNum, convertUnixTimeStamp } from '../utils';

import { fetchPopularArticles, fetchTrendingArticles, fetchSportArticles, fetchNewsArticles, selectPopularArticle, selectDataIsLoading } from '../features/articleSlice'; 


const PopularArticles = () => {
  const popularArticles = useSelector(selectPopularArticle);

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
      {/* {console.log(`dataLoading = ${dataLoading}`)} */}
      {dataLoading ? 
        <div className="App_loading-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div> : 
        popularArticles.map(article => ( 
        <div className="article_outer-container" key={article.id}>
          <div className="article_score-container">
            <FontAwesomeIcon className="article_score-icon" icon="arrow-up" /> 
            <p className="article_score">{abbrNum(article.score)}</p>
            <FontAwesomeIcon className="article_score-icon" icon="arrow-down" /> 
          </div>

          <div className="article_main-content-container">
            <div className="article_details-top-container">
              <div className="article_post-details">
                <p className="article_api-data">Posted by <span className="strong">{article.author}</span></p>
                <p className="article_api-data">{convertUnixTimeStamp(article.created)}</p>
              </div>
              <div className="article_join-btn">
                <FontAwesomeIcon className="article_join-icon" icon="plus" />
                <p className="article_join-btn-text"><strong>Join</strong></p>
              </div>
            </div>

            <div className="article_title-bottom-details-img-container">
              <div className="article_title-bottom-details-container">
                <div className="article_title-container">
                  <h1 className="article_title">{article.title}</h1>
                </div>
                
                <div className="article_bottom-details-container">
                  <FontAwesomeIcon className="article_comments-icon" icon={['far', 'comment-alt']} />
                  <p className="article_api-data"><strong>{`${abbrNum(article.numComments)} `} Comments</strong></p>

                  <FontAwesomeIcon className="article_share-icon" icon="share" />
                  <p className="article_api-data"><strong>Share</strong></p>

                  <FontAwesomeIcon className="article_ellipsis-icon" icon="ellipsis-h" />
                </div>
              </div> 

              {article.thumbnail.url.includes('https') && <div className="article_img-container">
                <img src={article.thumbnail.url} height={article.thumbnail.height} width={article.thumbnail.width} alt="Img..." className="article_article-img"></img>
              </div>}
            </div>
          </div>
        </div>))
      }
    </div>
  )
}

export default PopularArticles;