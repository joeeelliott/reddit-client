import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
// import mockImg from '../images/mockpic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { abbrNum, convertUnixTimeStamp } from '../utils';

import { fetchPopularArticles, fetchTrendingArticles, fetchSportArticles, fetchNewsArticles, selectPopularArticle, selectDataIsLoading, selectInitialState, ellipsisToggle, addSavedArticle, removeSavedArticle, hideArticle, showArticles } from '../features/articleSlice'; 

import { selectShowSideNav } from '../features/sideNavSlice'; 


const PopularArticles = () => {
  const popularArticles = useSelector(selectPopularArticle);
  const dataLoading = useSelector(selectDataIsLoading);

  const sideNavState = useSelector(selectShowSideNav); 
  
  const dispatch = useDispatch();

  let hiddenArticles = [];

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

  useEffect(() => {
    if(sideNavState.eyeClicked) {
      const hiddenArticles = document.getElementsByClassName('article_outer-container-hide'); 

      let hiddenArticleIds = [];

      for(let i = 0; i < hiddenArticles.length;) {  // i doesnt iterate bcos as each article at index 0 is removed, the next article in the array to be removed is index 0 and so on.
        hiddenArticleIds.push(hiddenArticles[i].id);
        hiddenArticles[i].classList.remove('article_outer-container-hide'); 
        dispatch(showArticles({ id: hiddenArticleIds }));
      }
    }
  }, [sideNavState.eyeClicked]); // only executes on eyeClick

  const handleEllipsisClick = (e) => {
    // console.log(e.currentTarget.children[1]); 

    // dispatch(ellipsisToggle());
    e.currentTarget.children[1].classList.toggle('article_ellipsis-dropdown-show');

    // e.currentTarget.children[1].classList.contains('article_ellipsis-dropdown-show') ? e.currentTarget.classList.toggle('article_ellipsis-dropdown-active') : e.currentTarget.classList.toggle('article_ellipsis-dropdown-active');
  }

  const handleSaveClick = (e) => {
    let article = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
    let currentArticle;    // the article state of clicked article

    popularArticles.forEach(item => {
      if(item.id === article.id) {
        currentArticle = item; 
      }
    });

    const link = document.getElementsByClassName('nav_link')[4].children[0];

    if(!currentArticle.saved){  // if article.saved === false
      link.classList.add('nav_saved-article-animation');
      e.currentTarget.children[1].innerHTML = 'Saved';
      e.currentTarget.classList.toggle('article_save-container-clicked');
      dispatch(addSavedArticle({ id: article.id })); 
            
      setTimeout(() => link.classList.remove('nav_saved-article-animation'), 1100); 
    } else {                    // else if article.saved === true
      e.currentTarget.children[1].innerHTML = 'Save';
      e.currentTarget.classList.toggle('article_save-container-clicked');
      dispatch(removeSavedArticle({ id: article.id })); 
    } 
  }
  const handleHideClick = (e) => {
    let article = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
    let currentArticle;    // the article state of clicked article

    console.log(article); 
    popularArticles.forEach(item => {
      if(item.id === article.id) {
        currentArticle = item; 
      }
    });

    if(!currentArticle.hidden){  // if article.hidden === false
      article.classList.toggle('article_outer-container-hide');
      dispatch(hideArticle({ id: article.id }));  
    }
  }

  const handleReportClick = (e) => {
    let article = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
    let currentArticle;    // the article state of clicked article

    popularArticles.forEach(item => {
      if(item.id === article.id) {
        currentArticle = item; 
      }
    });

    if(!currentArticle.saved){  // if article.saved === false
      e.currentTarget.children[1].innerHTML = 'Reported';
      e.currentTarget.classList.toggle('article_report-container-clicked');
      dispatch(addSavedArticle({ id: article.id }));  
    } else {                    // else if article.saved === true
      e.currentTarget.children[1].innerHTML = 'Report';
      e.currentTarget.classList.toggle('article_report-container-clicked');
      dispatch(removeSavedArticle({ id: article.id })); 
    }
  }

  return (
    <div>
      {/* {console.log(`dataLoading = ${dataLoading}`)} */}
      {dataLoading ? 
        <div className="App_loading-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div> : 
        popularArticles.map(article => ( 
        <div className="article_outer-container" key={article.id} id={article.id}>
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
                  <div className="article_comments-icon-container">
                    <FontAwesomeIcon className="article_comments-icon" icon={['far', 'comment-alt']} />
                    <p className="article_api-data">{`${abbrNum(article.numComments)} `} Comments</p>
                  </div>

                 <div className="article_share-icon-container">
                    <FontAwesomeIcon className="article_share-icon" icon="share" />
                    <p className="article_api-data">Share</p>
                  </div>

                 <div className="article_ellipsis-container" onClick={handleEllipsisClick}>
                    <FontAwesomeIcon className="article_ellipsis-icon" icon="ellipsis-h" />
                    <div className="article_ellipsis-dropdown">
                      <div className="article_save-container" onClick={handleSaveClick}>
                        <div  className="article_save-icon-container">
                          <FontAwesomeIcon className="article_save-icon" icon={['far', 'bookmark']} />
                        </div>
                        
                        <p className="article_save-text">Save</p>
                      </div>

                      <div className="article_hide-container" onClick={handleHideClick}>
                        <div className="article_hide-icon-container">
                          <FontAwesomeIcon className="article_hide-icon" icon={['far', 'eye-slash']} />
                        </div>

                        <p className="article_hide-text">Hide</p>
                      </div>
                      <div className="article_report-container" onClick={handleReportClick}>
                        <div className="article_report-icon-container">
                          <FontAwesomeIcon className="article_report-icon" icon={['far', 'flag']} />
                        </div>

                        <p className="article_report-text">Report</p>
                      </div>
                    </div>
                  </div> 
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