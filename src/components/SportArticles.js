import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { abbrNum, convertUnixTimeStamp } from '../utils';

import { fetchPopularArticles, fetchSportArticles, fetchNewsArticles, selectSportArticle, selectDataIsLoading } from '../features/articleSlice'; 

import Article from './Article';

const SportArticles = () => {
  const sportArticles = useSelector(selectSportArticle);
  const dataLoading = useSelector(selectDataIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    sportArticles.length === 0 &&  // prevents from fetching 10 more articles each re-render, only runs if no data is stored
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
      {!dataLoading && sportArticles.map(article => ( 
        <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} thumbnail={article.thumbnail} articles={sportArticles} /> 
      ))}        
    </div>
  )
}

export default SportArticles;