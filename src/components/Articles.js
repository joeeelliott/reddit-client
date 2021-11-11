import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { selectPopularArticle,selectSportArticle, selectNewsArticle, selectSavedArticle, fetchPopularArticles, fetchSportArticles, fetchNewsArticles, selectDataIsLoading, showArticles, selectInitialState, toggleEllipsis } from '../features/articleSlice'; 
import { selectShowSideNav } from '../features/sideNavSlice'; 
import Article from './Article'; 
import SavedArticles from './SavedArticles'; 

const Articles = () => {
  const dispatch = useDispatch(); 
  const dataLoading = useSelector(selectDataIsLoading); 
  const popularArticles = useSelector(selectPopularArticle);
  const sportArticles = useSelector(selectSportArticle);
  const newsArticles = useSelector(selectNewsArticle);
  const savedArticles = useSelector(selectSavedArticle);
  const sideNavState = useSelector(selectShowSideNav); 
  const initialState = useSelector(selectInitialState); 

  const location = useLocation(); 
  // console.log(location.pathname); 

  let articles; 

  // Determines which articles state to render
  if(location.pathname === '/'){   
    articles = popularArticles; 
    // articleType = 'popular';
  } else if(location.pathname === '/sport'){
    articles = sportArticles; 
    // articleType = 'sport';
  } else if(location.pathname === '/news'){
    articles = newsArticles; 
    // articleType = 'news';
  } else if(location.pathname === '/saved'){
    articles = savedArticles;
    // articleType = 'saved'; 
  } 

  useEffect(() => {
    popularArticles.length === 0 &&  // prevents from fetching 10 more articles each re-render, only runs if no data is stored
    (async () => {
      await dispatch(fetchPopularArticles());
      await dispatch(fetchSportArticles());
      await dispatch(fetchNewsArticles());
    })()
    // return () => {
    //   return; 
    // }
  }, []);

  // useEffect below required in this component to ensure that the clicking of the eye in the sideNav when we're on the Saved Link dispatches the showArticles() method the same as the other Links. 
  useEffect(() => {
    if(sideNavState.eyeClicked) {
      // const hiddenArticles = document.getElementsByClassName('article_outer-container-hide'); 
      // console.log(hiddenArticles); 

      dispatch(showArticles()); 

      // let hiddenArticleIds = [];

      // for(let i = 0; i < hiddenArticles.length;) {  // we make i purposely not iterate so that as each article at index 0 is removed (via the removal of the classList below), the next article ([i]) in the array to be removed is index 0 and so on. This is because for this action we do want every single article in the array to perform the class removal. 
      //   hiddenArticleIds.push(hiddenArticles[i].id);  // used to send to state so the 'hide' state for that article can be set to false. 
      //   hiddenArticles[i].classList.remove  ('article_outer-container-hide'); // removes this class from each article in the hiddenArticles array until none remain. 
      // }
    }
  }, [sideNavState.eyeClicked]); // only executes on eyeClick state change (clicking the eye)

  useEffect(() => {   // only executed on change of ellipsisClicked
    if(initialState.articles.ellipsisClicked){  // if ellipsis has been clicked 
      document.addEventListener('mouseup', ellipsisClickedDocumentEventListener);
    } else if(!initialState.articles.ellipsisClicked){
      document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener);
    }

    return () => {
      document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener); 
    }
  }, [initialState.articles.ellipsisClicked]); 

  const ellipsisClickedDocumentEventListener = (e) => {
    const articleEllipsisContainers = Array.from(document.getElementsByClassName('article_ellipsis-container'));
    const target = articleEllipsisContainers.filter(item => item.children[1].classList.contains('article_ellipsis-dropdown-show'));  // accesses the ellipsis container of the (specific) clicked ellipsis, as there will only be one container open at a time

    if(target.length > 0){    // prevents error by only executing if we have an ellipsis dropdown open
      if(target[0].contains(e.target)){  // if we click on any part of ellipsis container 
        document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener);   // remove listener as the dropdown is removed
      } else if(!target[0].contains(e.target)){   // if click outside of ellipsis container...
        dispatch(toggleEllipsis()); // .. toggle to false
        target[0].children[1].classList.remove('article_ellipsis-dropdown-show');  // ..remove dropdown
        document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener);  // remove listener     
      }
    }
  }

  return (
    <div>
      {dataLoading ? 
        <div className="App_loading-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div> : !dataLoading && articles !== savedArticles ? 
          articles.map(article => ( 
            // <div className="article_container">
              <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} /> 
            // </div>
          )) 
      : <SavedArticles />}
    </div>
  )
}

export default Articles;