import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import Article from './Article';
import { selectSavedArticle, selectInitialState, showArticles } from '../features/articleSlice'; 
import { selectShowSideNav } from '../features/sideNavSlice'; 

const SavedArticles = ({ allArticles }) => {
  const dispatch = useDispatch(); 
  const sideNavState = useSelector(selectShowSideNav); 
  const savedArticles = useSelector(selectSavedArticle);

  useEffect(() => {
    if(sideNavState.eyeClicked) {
      // console.log('useEffect working in savedArticles'); 
      // const hiddenArticles = document.getElementsByClassName('article_outer-container-hide'); 
      // console.log(hiddenArticles);

      dispatch(showArticles()); 

      // let hiddenArticleIds = [];

      // for(let i = 0; i < hiddenArticles.length;) {  // we make i purposely not iterate so that as each article at index 0 is removed (via the removal of the classList below), the next article ([i]) in the array to be removed is index 0 and so on. This is because for this action we do want every single article in the array to perform the class removal. 
      //   hiddenArticleIds.push(hiddenArticles[i].id);  // used to send to state so the 'hide' state for that article can be set to false. 
      //   hiddenArticles[i].classList.remove  ('article_outer-container-hide'); // removes this class from each article in the hiddenArticles array until none remain. 
      //   dispatch(showArticles({ id: hiddenArticleIds }));   // array sent to state where each article with 'hide:true' can be set to false  
      // }
    }
  }, [sideNavState.eyeClicked]); // only executes on eyeClick state change (clicking the eye)

  return (
    // <div className={savedArticles.length < 3 ? "article_saved-articles" : "article_saved-articles-2plus"}>    // no longer need as flexed content and footer apart in class 'App'. 
    <div>
      {savedArticles.length > 0 ? savedArticles.map(article => (
        
          <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} articles={savedArticles} allArticles={allArticles} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} /> 
      ))
      : 
      <div className="article_saved-articles-none-saved">
        <h1>You currently have no saved posts.</h1>
        <p>Click <strong>save</strong> on your favorite posts and see them all together here.</p>
      </div>}        
    </div>
  )
}

export default SavedArticles;