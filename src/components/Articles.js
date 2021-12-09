import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { selectPopularArticle,selectSportArticle, selectNewsArticle, selectSavedArticle, fetchPopularArticles, fetchSportArticles, fetchNewsArticles, selectDataIsLoading, showArticles, selectInitialState, toggleEllipsis, closeAllImgModals, selectSearchedArticle, numOfPostsToState } from '../features/articleSlice'; 
import { selectShowSideNav } from '../features/sideNavSlice'; 
import Article from './Article'; 


const Articles = () => {
  const dispatch = useDispatch(); 
  const dataLoading = useSelector(selectDataIsLoading); 
  const popularArticles = useSelector(selectPopularArticle);
  const sportArticles = useSelector(selectSportArticle);
  const newsArticles = useSelector(selectNewsArticle);
  // const savedArticles = useSelector(selectSavedArticle);
  // const searchedArticles = useSelector(selectSearchedArticle); 
  const sideNavState = useSelector(selectShowSideNav); 
  const initialState = useSelector(selectInitialState); 

  const location = useLocation(); 
  // console.log(location.pathname); 

  let articles; 

  // Determines which articles state to render dependant on which nav is open
  if(location.pathname === '/'){   
    articles = popularArticles; 
    // articleType = 'popular';
  } else if(location.pathname === '/sport'){
    articles = sportArticles; 
    // articleType = 'sport';
  } else if(location.pathname === '/news'){
    articles = newsArticles; 
    // articleType = 'news';
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

  // const allArticles = [initialState.articles.popularArticles, initialState.articles.sportArticles, initialState.articles.newsArticles,];
  const allArticles = initialState.articles.allArticles; 

  useEffect(() => {
    if(!dataLoading){ 
      let popularHiddenCount = 0;
      let newsHiddenCount = 0;
      let sportHiddenCount = 0; 
      let hiddenCount = 0; 
      let reportCount = 0; 
        allArticles.forEach(article => { 
          if(article.hidden){
            hiddenCount++; 
          } 
          if(article.reported){
            reportCount++; 
          }
          if(article.articleType === 'popular' && article.hidden){
            popularHiddenCount++;
          } else if(article.articleType === 'sport' && article.hidden){
            sportHiddenCount++;
          } else if(article.articleType === 'news' && article.hidden){
            newsHiddenCount++;
          }
        });

      dispatch(numOfPostsToState({ 
        All: { id: 'All', data: initialState.articles.popularArticles.length + initialState.articles.popularArticles.length + initialState.articles.popularArticles.length},
        Popular: {id: 'Popular', data: initialState.articles.popularArticles.length - popularHiddenCount},
        News: {id: 'News', data: initialState.articles.newsArticles.length - newsHiddenCount},
        Sport: {id: 'Sport', data: initialState.articles.sportArticles.length - sportHiddenCount},
        Saved: {id: 'Saved', data: initialState.articles.savedArticles.length},
        Hidden: {id: 'Hidden', data: hiddenCount},        
        Reported: {id: 'Reported', data: reportCount},
      }));
    }
  });

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

  useEffect(() => {   // only executed on change of imgClicked
    if(initialState.articles.imgClicked){  // if any img has been clicked 
      document.addEventListener('mouseup', imgClickedDocumentEventListener);
    } else if(!initialState.articles.imgClicked){
      document.removeEventListener('mouseup', imgClickedDocumentEventListener);
    }

    return () => {
      document.removeEventListener('mouseup', imgClickedDocumentEventListener); 
    }
  }, [initialState.articles.imgClicked]); 

  const imgClickedDocumentEventListener = (e) => {
    const target = document.getElementsByClassName('article_img-modal');  // access the open modal
    if(!target[0].contains(e.target)){   // if user clicks outside of the open modal...
      dispatch(closeAllImgModals());   // close all modals
    }
  }

  const searchedArticlesFound = initialState.articles.searchedArticlesFound; 

  const userSearching = initialState.articles.isSearching;
  const userFiltering = initialState.articles.filterMode; 
  const filteredPosts = initialState.articles.filteredPosts; 

  const filteredSpecifics = initialState.articles.filteredSpecifics; 

  const searchText = initialState.articles.searchText;

  let reportedArticles = initialState.articles.reportedArticles; 
  let hiddenArticles = initialState.articles.hiddenArticles; 
  let savedArticles = initialState.articles.savedArticles; 
  let searchedArticles = initialState.articles.searchedArticles;

  if(dataLoading){      // fetching data
    return (
      <div className="App_loading-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
      </div>
    )
  } else if(!dataLoading) {      // fetching data completed
    if(userSearching){     // value in user search input
      if(searchedArticlesFound){   // if article titles match
        return (
          searchedArticles.map(article => {
            return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
          })

          // allArticles.map(article => {
          //   return article.title.toLowerCase().includes(searchText.toLowerCase()) && 
          //     <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} /> 
          // })
        )
      } else if(!searchedArticlesFound){   // if no article titles match 
        return (
          <div className="article_saved-articles-none-saved">
            <h1>No articles found</h1>
            <p>Please use specific, related, and correctly spelt words for an effective search.</p>
          </div>
        )
      }
    
    } else if(userFiltering) {    // if filter applied
      if(filteredPosts !== '' && filteredSpecifics === ''){ // filteredPosts BUT NO filteredSpecifics
        if(filteredPosts === 'All'){
          // console.log(sortArr(filteredPosts, filteredSpecifics))
          return (
            allArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
            })
          )
        } else if(filteredPosts === 'Popular'){
          return (
            popularArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
            })
          )
        } else if(filteredPosts === 'Sport'){
          return (
            sportArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
            })
          )
        } else if(filteredPosts === 'News'){
          return (
            newsArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
            })
          )
        } else if(filteredPosts === 'Saved'){
          return (
            savedArticles.length > 0 ? savedArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} /> 
            })
            : 
            <div className="article_saved-articles-none-saved">
              <h1>You currently have no saved posts.</h1>
              <p>Click <strong>save</strong> on your favorite posts and see them all together here.</p>
            </div>
          )
        } else if(filteredPosts === 'Hidden'){
          return (
            hiddenArticles.length > 0 ? hiddenArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} /> 
            })
            : 
            <div className="article_saved-articles-none-saved">
              <h1>You currently have no hidden posts.</h1>
              <p>Any posts hidden from your timeline can be viewed here, where you can choose to unhide them if necessary. Alternatively, by clicking the eye icon at the bottom of the sidebar navigation, all hidden posts will be unhidden and restored to the timeline.</p>
            </div>
          )
        } else if(filteredPosts === 'Reported'){
          return (
            reportedArticles.length > 0 ? reportedArticles.map(article => {
              return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} /> 
            })
            : 
            <div className="article_saved-articles-none-saved">
              <h1>You currently have no reported posts.</h1>
              <p>If you ever report a post from your timeline it will appear here, where can you unreport it if necessary.</p>
            </div>
          )
        }
      } else if(filteredPosts !== '' && filteredSpecifics !== ''){   // filteredPosts AND filteredSpecifics
        const arr = initialState.articles.filteredSpecificsArray; 
        
        return (
          arr.map(article => {
            return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
          })
        )    
      } else if(filteredPosts === '' && filteredSpecifics !== ''){     // NO filteredPosts BUT filteredSpecifics
        const arr = initialState.articles.filteredSpecificsArray; 
        // console.log('specific filter clicked, no post filter');
        return (
          arr.map(article => {
            return <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} />
          })
        )
      }
      
    } else if(!userSearching && !userFiltering) {     // not searching or filtering, articles = route page => (popular, sport, news)
      // console.log('not searching or filtering, renders based on route page')
      return (
        articles.map(article => ( 
          <Article key={article.id} id={article.id} score={article.score} author={article.author} created={article.created} title={article.title} numComments={article.numComments} saved={article.saved} thumbnail={article.thumbnail} articles={articles} allArticles={allArticles} articleType={article.articleType} scoredUp={article.scoredUp} scoredDown={article.scoredDown} hidden={article.hidden} reported={article.reported} imgClicked={article.imgClicked} /> 
        ))
      )
    } 
  }
}

export default Articles;