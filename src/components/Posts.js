import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

import { selectPopularPost, selectSportPost, selectNewsPost, fetchPopularPosts, fetchSportPosts, fetchNewsPosts, selectDataIsLoading, selectInitialState, toggleEllipsis, closeAllImgModals, numOfPostsToState, selectPopularHasError, selectSportHasError, selectNewsHasError, selectSearchedPostsFound, selectUserSearching, selectUserFiltering, selectPostFilter, selectSpecificsFilter, selectReportedPosts, selectHiddenPosts, selectSavedPost, selectSearchedPost, selectAllPosts } from '../features/postSlice'; 

import Post from './Post'; 

const Posts = () => {
  const dispatch = useDispatch(); 
  const dataLoading = useSelector(selectDataIsLoading); 
  const popularPosts = useSelector(selectPopularPost);
  const sportPosts = useSelector(selectSportPost);
  const newsPosts = useSelector(selectNewsPost);
  const allPosts = useSelector(selectAllPosts); 
  const initialState = useSelector(selectInitialState); 

  const popularError = useSelector(selectPopularHasError);
  const sportError = useSelector(selectSportHasError)
  const newsError = useSelector(selectNewsHasError)

  const searchedPostsFound = useSelector(selectSearchedPostsFound);
  const userSearching = useSelector(selectUserSearching);
  const userFiltering = useSelector(selectUserFiltering);
  const postFilter = useSelector(selectPostFilter);
  const specificFilter = useSelector(selectSpecificsFilter) ;

  let reportedPosts = useSelector(selectReportedPosts); 
  let hiddenPosts = useSelector(selectHiddenPosts);
  let savedPosts = useSelector(selectSavedPost);
  let searchedPosts = useSelector(selectSearchedPost);

  const location = useLocation(); 
  let posts; 

  // Determines which posts state to render dependant on which nav is open
  if(location.pathname === '/'){   
    posts = popularPosts; 
  } else if(location.pathname === '/sport'){
    posts = sportPosts; 
  } else if(location.pathname === '/news'){
    posts = newsPosts; 
  } 

  useEffect(() => {
    popularPosts.length === 0 &&  // prevents from fetching 10 more posts each re-render, only runs if no data is stored
    (async () => {
      await dispatch(fetchPopularPosts());
      await dispatch(fetchSportPosts());
      await dispatch(fetchNewsPosts());
    })()
  }, [dispatch, popularPosts.length]);

  // set the number that appears next to the postFilters. Once a post is hidden, the count effectively decreases by one on 'All' and whichever post type that post belongs to. However, it still appears in saved and reported (if user clicks those) and of course appears in hidden. 
  useEffect(() => {
    if(!dataLoading){ 
      let popularHiddenCount = 0;
      let newsHiddenCount = 0;
      let sportHiddenCount = 0; 
      let hiddenCount = 0; 
      let reportCount = 0; 

      allPosts.forEach(post => { 
        if(post.hidden){
          hiddenCount++; 
        } 
        if(post.reported){
          reportCount++; 
        }
        if(post.postType === 'popular' && post.hidden){
          popularHiddenCount++;
        } else if(post.postType === 'sport' && post.hidden){
          sportHiddenCount++;
        } else if(post.postType === 'news' && post.hidden){
          newsHiddenCount++;
        }
      });
      
      // add the total number of posts for each post category, then minus the number of hidden posts to give us the number of posts in that post category next to each one in the sideNav
      dispatch(numOfPostsToState({ 
        All: { id: 'All', data: initialState.posts.popularPosts.length + initialState.posts.sportPosts.length + initialState.posts.newsPosts.length - popularHiddenCount - newsHiddenCount - sportHiddenCount},
        Popular: {id: 'Popular', data: initialState.posts.popularPosts.length - popularHiddenCount},
        News: {id: 'News', data: initialState.posts.newsPosts.length - newsHiddenCount},
        Sport: {id: 'Sport', data: initialState.posts.sportPosts.length - sportHiddenCount},
        Saved: {id: 'Saved', data: initialState.posts.savedPosts.length},
        Hidden: {id: 'Hidden', data: hiddenCount},        
        Reported: {id: 'Reported', data: reportCount},
      }));
    }
  });

  useEffect(() => {   // only executed on change of ellipsisClicked
    if(initialState.posts.ellipsisClicked){  // if ellipsis has been clicked 
      document.addEventListener('mouseup', ellipsisClickedDocumentEventListener);
    } else if(!initialState.posts.ellipsisClicked){
      document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener);
    }

    return () => {
      document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener); 
    }
  }); 


  // document event listener that closes all other open dropdowns if another is clicked. Listener removed if no dropdowns open. 
  const ellipsisClickedDocumentEventListener = (e) => {
    const postEllipsisContainers = Array.from(document.getElementsByClassName('post_ellipsis-container'));
    const target = postEllipsisContainers.filter(item => item.children[1].classList.contains('post_ellipsis-dropdown-show'));  // accesses the ellipsis container of the (specific) clicked ellipsis, as there will only be one container open at a time

    if(target.length > 0){    // prevents error by only executing if we have an ellipsis dropdown open
      if(target[0].contains(e.target)){  // if we click on any part of ellipsis container 
        document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener);   // remove listener as the dropdown is removed
      } else if(!target[0].contains(e.target)){   // if click outside of ellipsis container...
        dispatch(toggleEllipsis()); // .. toggle to false
        target[0].children[1].classList.remove('post_ellipsis-dropdown-show');  // ..remove dropdown
        document.removeEventListener('mouseup', ellipsisClickedDocumentEventListener);  // remove listener     
      }
    }
  }

  // event listener for the document added when an img is clicked, so that if any part of the screen other than the image is clicked, img minimizes again
  useEffect(() => {   // only executed on change of imgClicked
    if(initialState.posts.imgClicked){  // if any img has been clicked 
      document.addEventListener('mouseup', imgClickedDocumentEventListener);
    } else if(!initialState.posts.imgClicked){
      document.removeEventListener('mouseup', imgClickedDocumentEventListener);
    }

    return () => {
      document.removeEventListener('mouseup', imgClickedDocumentEventListener); 
    }
  }); 

  const imgClickedDocumentEventListener = (e) => {
    const target = document.getElementsByClassName('post_img-modal');  // access the open modal
    if(!target[0].contains(e.target)){   // if user clicks outside of the open modal...
      dispatch(closeAllImgModals());   // close all modals
    }
  }

  if(dataLoading){      // fetching data
    return (
      <div className="App_loading-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
      </div>
    )
  } else if(!dataLoading) {      // fetching data completed
    if(userSearching){     // value in user search input
      if(searchedPostsFound){   // if post titles match
        return (
          searchedPosts.map(post => {
            return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
          })
        )
      } else if(!searchedPostsFound){   // if no post titles match 
        return (
          <div className="post_no-posts">
            <h1>No posts found</h1>
            <p>Please use specific, related, and correctly spelt words for an effective title search.</p>
          </div>
        )
      }
    } else if(userFiltering) {    // if filter applied
      if(postFilter && !specificFilter){ // postFilter BUT NO specificFilter
        if(postFilter === 'All'){
          return (
            allPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
            })
          )
        } else if(postFilter === 'Popular'){
          return (
            !popularError ? popularPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
            })
            :
            <div className="post_no-posts">
              <h1>We apologise! We seem to be having technical issues fetching the data for popular posts.</h1>
              <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
            </div>
          )
        } else if(postFilter === 'Sport'){
          return (
            !sportError ? sportPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
            })
            :
            <div className="post_no-posts">
              <h1>We apologise! We seem to be having technical issues fetching the data for sport posts.</h1>
              <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
            </div>
          )
        } else if(postFilter === 'News'){
          return (
            !newsError ? newsPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
            })
            : 
            <div className="post_no-posts">
              <h1>We apologise! We seem to be having technical issues fetching the data for news posts.</h1>
              <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
            </div>
          )
        } else if(postFilter === 'Saved'){
          return (
            savedPosts.length > 0 ? savedPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} /> 
            })
            : 
            <div className="post_no-posts">
              <h1>You currently have no saved posts.</h1>
              <p>Click <strong>save</strong> on your favorite posts and see them all together here.</p>
            </div>
          )
        } else if(postFilter === 'Hidden'){
          return (
            hiddenPosts.length > 0 ? hiddenPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} /> 
            })
            : 
            <div className="post_no-posts">
              <h1>You currently have no hidden posts.</h1>
              <p>Any posts hidden from your timeline can be viewed here, where you can choose to unhide them if necessary. Alternatively, by clicking the <strong>eye icon</strong> at the bottom of the sidebar navigation, all hidden posts will be unhidden and restored to the timeline.</p>
            </div>
          )
        } else if(postFilter === 'Reported'){
          return (
            reportedPosts.length > 0 ? reportedPosts.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} /> 
            })
            : 
            <div className="post_no-posts">
              <h1>You currently have no reported posts.</h1>
              <p>If you ever report a post from your timeline it will appear here, where can you unreport it if necessary.</p>
            </div>
          )
        }
      } else if(postFilter && specificFilter){   // postFilter AND specificFilter
        const arr = initialState.posts.specificsSortedArray;
        return (
          arr.length > 0 ? arr.map(post => {
            return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
          }) 
          :
          <div className="post_no-posts">
              <h1>There are no posts stored in this filter.</h1>
              <p>You must add posts to this category in order to add a <strong>post specifics</strong> filter.</p>
          </div>
        )   
      } else if(!postFilter && specificFilter){     // NO postFilter BUT specificFilter
        const arr = initialState.posts.specificsSortedArray; 
        // console.log('specific filter clicked, no post filter');
        if(arr.length > 0){  // if 
          return (
            arr.map(post => {
              return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
            })
          )
        } else {
          return (
            <div className="post_no-posts">
              <h1>We apologise! We seem to be having technical issues fetching the data for these posts.</h1>
              <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
            </div>
          )
        }
      }
      
    } else if(!userSearching && !userFiltering) {     // not searching or filtering, posts = route page => (popular, sport, news)
      if(posts === popularPosts){
        return ( 
          !popularError ? popularPosts.map(post => {
            return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
          })
          : 
          <div className="post_no-posts">
            <h1>We apologise! We seem to be having technical issues fetching the data for popular posts.</h1>
            <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
          </div>
        )
      } else if(posts === sportPosts){
        return ( 
          !sportError ? sportPosts.map(post => {
            return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
          })
          : 
          <div className="post_no-posts">
            <h1>We apologise! We seem to be having technical issues fetching the data for sport posts.</h1>
            <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
          </div>
        )
      } else if(posts === newsPosts){
        return ( 
          !newsError ? newsPosts.map(post => {
            return <Post key={post.id} id={post.id} score={post.score} author={post.author} created={post.created} title={post.title} numComments={post.numComments} saved={post.saved} thumbnail={post.thumbnail} permalink={post.permalink} posts={posts} postType={post.postType} scoredUp={post.scoredUp} scoredDown={post.scoredDown} hidden={post.hidden} reported={post.reported} imgClicked={post.imgClicked} />
          })
          : 
          <div className="post_no-posts">
            <h1>We apologise! We seem to be having technical issues fetching the data for news posts.</h1>
            <p>Please be patient with us, we are working hard to fix the issue in a timely manor.</p>
          </div>
        )
      }
    } 
  }
}

export default Posts;