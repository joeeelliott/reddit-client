import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { abbrNum, convertUnixTimeStamp } from '../utils';

import Article from './Article';

import { fetchPopularArticles, fetchSportArticles, fetchNewsArticles, selectNewsArticle, selectDataIsLoading } from '../features/articleSlice'; 

const NewsArticles = () => {
  const newsArticles = useSelector(selectNewsArticle);

  const dataLoading = useSelector(selectDataIsLoading);
  
  const dispatch = useDispatch();

  useEffect(() => {
    newsArticles.length === 0 &&  // prevents from fetching 10 more articles each re-render, only runs if no data is stored
    (async () => {
      await dispatch(fetchPopularArticles());
      await dispatch(fetchSportArticles());
      await dispatch(fetchNewsArticles());
    })()
    // return () => {
    //   return; 
    // }
  }, []);

  return (
    <div>
      {!dataLoading && newsArticles.map(article => ( 
        <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} thumbnail={article.thumbnail} articles={newsArticles} /> 
      ))}        
    </div>
  )
}

export default NewsArticles;