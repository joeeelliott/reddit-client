import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { abbrNum, convertUnixTimeStamp } from '../utils';
import { fetchPopularArticles, fetchSportArticles, fetchNewsArticles, selectPopularArticle, selectDataIsLoading, selectInitialState, toggleEllipsis, addSavedArticle, removeSavedArticle, hideArticle, showArticles, reportArticle, scoreArticle } from '../features/articleSlice'; 
import { selectShowSideNav } from '../features/sideNavSlice'; 


const PopularArticles = () => {
  const popularArticles = useSelector(selectPopularArticle);
  const dataLoading = useSelector(selectDataIsLoading);
  const initialState = useSelector(selectInitialState); 
  const sideNavState = useSelector(selectShowSideNav); 
  
  const dispatch = useDispatch();

  useEffect(() => {
    popularArticles.length === 0 &&  // prevents from fetching 10 more articles each re-render, only runs if no data is stored
    (async () => {
      await dispatch(fetchPopularArticles());
      await dispatch(fetchSportArticles());
      await dispatch(fetchNewsArticles());
    })()
  }, []);

  useEffect(() => {
    if(sideNavState.eyeClicked) {
      const hiddenArticles = document.getElementsByClassName('article_outer-container-hide'); 

      let hiddenArticleIds = [];

      for(let i = 0; i < hiddenArticles.length;) {  // we make i purposely not iterate so that as each article at index 0 is removed (via the removal of the classList below), the next article ([i]) in the array to be removed is index 0 and so on. This is because for this action we do want every single article in the array to perform the class removal. 
        hiddenArticleIds.push(hiddenArticles[i].id);  // used to send to state so the 'hide' state for that article can be set to false. 
        hiddenArticles[i].classList.remove  ('article_outer-container-hide'); // removes this class from each article in the hiddenArticles array until none remain. 
        dispatch(showArticles({ id: hiddenArticleIds }));   // array sent to state where each article with 'hide:true' can be set to false  
      }
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

  const handleEllipsisClick = (e) => {
    if(!initialState.articles.ellipsisClicked){   // if ellipsis not clicked, toggle state to true
      dispatch(toggleEllipsis());
    } else {
      dispatch(toggleEllipsis()); 
    }
    
    e.currentTarget.children[1].classList.toggle('article_ellipsis-dropdown-show');   // opens dropdown of clicked ellipsis article 
    const currentId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.id;  // id of clicked ellipsis article
    const openEllipsisArticles = document.getElementsByClassName('article_ellipsis-dropdown-show'); // array of each article which has ellipsis dropdown open
    for(let i = 0; i < openEllipsisArticles.length; i++){  // iterate through the articles with ellipsis dropdown open
      if(openEllipsisArticles[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id !== currentId){  // if the id of article in array doesn't match the id of clicked ellipsis article...
        openEllipsisArticles[i].classList.remove  ('article_ellipsis-dropdown-show');  // ...remove the dropdown
      }     
    }
  }

  const handleSaveClick = (e) => {
    let article = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
    const link = document.getElementsByClassName('nav_link')[3].children[0];
    popularArticles.forEach(item => {
      if(item.id === article.id) {
        if(!item.saved){  // if article not saved
          link.classList.add('nav_saved-article-animation');
          e.currentTarget.children[1].innerHTML = 'Saved';
          e.currentTarget.classList.toggle('article_save-container-clicked');
          dispatch(addSavedArticle({ id: article.id })); 
                
          setTimeout(() => link.classList.remove('nav_saved-article-animation'), 1100); 
        } else {                    // else if article is saved
          e.currentTarget.children[1].innerHTML = 'Save';
          e.currentTarget.classList.toggle('article_save-container-clicked');
          dispatch(removeSavedArticle({ id: article.id })); 
        }  
      }
    });
  }
  const handleHideClick = (e) => {
    let article = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; 
    popularArticles.forEach(item => {
      if(item.id === article.id) {
        if(!item.hidden){  // if article not hidden
          article.classList.toggle('article_outer-container-hide');
          dispatch(hideArticle({ id: article.id }));  
        }
      }
    });
  }

  const handleReportClick = (e) => {
    let currentArticle = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; // access to article outer container (to get id)
    dispatch(reportArticle({ id: currentArticle.id }));   // toggle reported state of currentArticle 
    popularArticles.forEach(article => {
      if(article.id === currentArticle.id){   // find match 
        if(!article.reported){   // if not reported
          e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
          e.currentTarget.children[1].innerHTML = 'Reported';
          const reportModal = Array.from(document.getElementsByClassName('article_report-modal'));
          reportModal[0].style.visibility = 'visible';
        } else {   // if reported
          e.currentTarget.style.backgroundColor = 'rgb(248, 248, 240';
          e.currentTarget.children[1].innerHTML = 'Report';
        }
      }
    });
  }

  const handleReportModalClose = (e) => {
    e.preventDefault(); 
    const reportModal = Array.from(document.getElementsByClassName('article_report-modal'));
    reportModal[0].style.visibility = 'hidden';    
  }

  const handleScoreClick = (e) => {
    let currentArticle = e.currentTarget.parentNode.parentNode;  // article outer with id
    let scored; 
    e.currentTarget.classList.contains('fa-arrow-up') ? scored = 'up' : scored = 'down';

    popularArticles.forEach(article => {
      if(article.id === currentArticle.id){
          dispatch(scoreArticle({id: currentArticle.id, scored: scored}));
      }
    });

    if(e.currentTarget.classList.contains('fa-arrow-up')){
      e.currentTarget.style.color = 'green';
      e.currentTarget.parentNode.children[2].style.color = 'rgb(150, 150, 150)';  // down arrow to grey
    } else {
      e.currentTarget.style.color = 'red';
      e.currentTarget.parentNode.children[0].style.color = 'rgb(150, 150, 150)';  // up arrow to grey
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
            <FontAwesomeIcon className="article_score-icon" icon="arrow-up" onClick={handleScoreClick} /> 
            <p className="article_score">{abbrNum(article.score)}</p>
            <FontAwesomeIcon className="article_score-icon" icon="arrow-down" onClick={handleScoreClick} /> 
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
      <div className="article_report-modal">
        <div className="article_report-modal-content">
          <div>
            <FontAwesomeIcon className="article_report-modal-report-icon" icon={['far', 'flag']} />
          </div>
          <h1>Post Reported</h1>
          <p>Reddit authorties have been informed and an investigation into the post will be opened. 
          </p>
          <p>In the meantime if you wish to hide this post from your timeline, click the hide button.</p>
          <div className="article_report-modal-btn-container">
            <button onClick={handleReportModalClose}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularArticles;