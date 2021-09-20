import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import mockImg from '../images/mockpic.png';

import { fetchArticles, selectArticle, selectArticleWithThumbnails, selectArticleWithoutThumbnails, selectArticleIsLoading } from '../features/articleSlice'; 
import { abbrNum, convertUnixTimeStamp } from '../utils';

const Article = () => {
  const articles = useSelector(selectArticle);
  const articlesWithThumbnails = useSelector(selectArticleWithThumbnails);
  const articlesWithoutThumbnails = useSelector(selectArticleWithoutThumbnails);
  const articlesLoading = useSelector(selectArticleIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchArticles());
    dispatch(fetchArticles('https://www.reddit.com/r/popular.json?limit=10'));
  }, []);

  // console.log(articlesLoading);

  // console.log((convertUnixTimeStamp(1632145047)));

  return (
    <div>

      <div className="article_article-div">
        <div className="article_comments-column">
          <p className="article_total-comments">{articlesLoading ? 'Data loading...' : abbrNum(articlesWithThumbnails[0].score)}</p>
        </div>
        <div className="article_main-content-div">
          <h1 className="article_title">{articlesLoading ? 'Data loading...' : articlesWithThumbnails[0].title}</h1>
          <div className="article_article">
            <img src={articlesLoading ? mockImg : articlesWithThumbnails[0].thumbnail} height="100%" width="100%" alt="Data loading..." className="article_article-img"></img>
          </div>

          <div className="article_article-details-div">
            <p className="article_article-detail">Posted By: <strong>{articlesLoading ? 'Data loading...' : articlesWithThumbnails[0].author}</strong></p>
            <p className="article_article-detail">{articlesLoading ? 'Data loading...' : convertUnixTimeStamp(articlesWithThumbnails[0].created)}</p>
            <p className="article_article-detail">{articlesLoading ? 'Data loading...' : `${abbrNum(articlesWithThumbnails[0].numComments)} comments`}</p>
          </div>
        </div>
      </div>

      <div className="article_article-div">
        <div className="article_comments-column">
          <p className="article_total-comments">{articlesLoading ? 'Data loading...' : abbrNum(articles[6].score)}</p>
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