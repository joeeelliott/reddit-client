// import { current } from '@reduxjs/toolkit';

export const abbrNum = num => {
  const string = num.toString(); 
  const numLength = num.toString().length; 

  if(numLength <= 3) {
    return num;
  } else if(numLength > 3) {
    if(numLength === 4) {
      return `${string.substring(0, 1)}.${string.substring(1, 2)}k`;
    } else if(numLength === 5) {
      return `${string.substring(0, 2)}.${string.substring(2, 3)}k`; 
    } else if(numLength === 6){
      return `${string.substring(0, 3)}k`; 
    }
  }
}

export const setPostsArr = (posts, state) => {
  let postsArr;

  if(posts === 'popular'){
    postsArr = state.popularPosts; 
  } else if(posts === 'sport'){
    postsArr = state.sportPosts; 
  } else if(posts === 'news'){
    postsArr = state.newsPosts; 
  }

  return postsArr; 
}

export const scoreFunc = (post, id, scored) => {
  if(post.id === id){
    if(!post.scoredUp && !post.scoredDown){
      if(scored === 'up'){
        post.score = post.score + 1;
        post.scoredUp = true;
      } else if(scored === 'down'){
        post.score = post.score - 1;
        post.scoredDown = true;
      }
    }  // if post not yet scored, and scored up, + 1 to score, scoredUp = true. if not yet scored and scored down, - 1 to score, scoredDown = true  

    else if(post.scoredUp && scored === 'down'){
      post.score = post.score - 2;
      post.scoredDown = true;
      post.scoredUp = false;
    }   // if post already been scored up, and scored is down, minus two from score to take it one below its original score. scoredDown = true, scoredUp = false

    else if(post.scoredDown && scored === 'up'){
      post.score = post.score + 2;
      post.scoredUp = true;
      post.scoredDown = false;
    }   // if post already been scored down, and scored is up, add two to score to take it one above its original score. scoredUp = true, scoredDown = false
  }

  else if(post.scoredDown && scored === 'down'){
    if(post.score <= 0){
      post.score = 0; 
    } 
  }  // if post already scored down and scored down again, if the first down made score less than or equal to 0, remains the same, score = 0. This condition doesn't allow a score of 0 to be set to -1. 
}

export const convertUnixTimeStamp = (timeStamp) => {
  const milliseconds = timeStamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString(); // 19/09/2021, 23:54:50

  // console.log(humanDateFormat.length);   // must be 20 to work

  const convertToDateObjTime = (string) => {
    const yr = string.substring(6, 10);  // 2021
    const month = string.substring(3, 5);  // 09
    const day = string.substring(0, 2);  // 19
    const time = string.substring(12, 20);  // 23:54:50
  
    return `${yr}-${month}-${day}T${time}`;
  }

  const date = new Date(convertToDateObjTime(humanDateFormat));

  const timeSince = date => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  return timeSince(date);
}

// determines correct state array to be sorted (dependant on filter) and returns the sorted array
export const sortSpecificsFilter = (state, specificsFilter, postFilter, route) => {
  
  if(postFilter){     // if there is a postFilter clicked
    const stateFilter = postFilter.toLowerCase(); 
    const correctArr = state[`${stateFilter}Posts`];  // returns the related state. i.e. if postFilter === 'All' (user clicked All filter), correctFilter = state[allPosts], which is equal to state.allPosts.

    correctArr.forEach(post => {
      state.specificsSortedArray.push(post);
    });   // push posts to specificsSortedArray array to await sorting. 

    miniSortArr(state, specificsFilter);  // sort array and return it in the expected sorted order. 
  } else {    // else if there is no postFilter clicked 
    if(!state.isSearching){   // if user isn't searching (user wants to filter the current posts in the UI)..
      if(route === ''){  // if current route is popularPosts
        state.popularPosts.forEach(post => {
          state.specificsSortedArray.push(post);
        });  //  push popularPosts into specsSorted array
  
        miniSortArr(state, specificsFilter);    // sort array based on the specificFilter
      } else if(route === 'sport'){  // else if current page is sportPosts
        state.sportPosts.forEach(post => {   
          state.specificsSortedArray.push(post);
        });   // push sportPosts into specsSorted array
  
        miniSortArr(state, specificsFilter); 
      } else if(route === 'news'){   // else if current page is newsPosts
        state.newsPosts.forEach(post => {
          state.specificsSortedArray.push(post);
        });   // push newsPosts into specsSorted array
  
        miniSortArr(state, specificsFilter); 
      }
    } else {    // else if user is searching - user wants to specFilter their searched posts 
      miniSortArr(state, specificsFilter);   // return sorted arr based on spec filter
    }
  }
}

// returns a sorted array dependant on filter passed in
export const miniSortArr = (state, specificsFilter) => {
  let arr;

  if(state.isSearching){  // if in searchMode..
    arr = 'searchedPosts';    //..sort searchedArr
  } else {   // if not in searchMode..
    arr = 'specificsSortedArray';  // ..sort filteredArr
  }

  if(specificsFilter === 'Score (High to Low)'){        
    state[arr].sort((a, b) => {
      return b.score - a.score; 
    });   // sorted to highest score first
  } else if(specificsFilter === 'Score (Low to High)'){        
    state[arr].sort((a, b) => {
      return a.score - b.score; 
    });   // sorted to lowest score first
  } else if(specificsFilter === 'Posted (Most Recent to Oldest)'){        
    state[arr].sort((a, b) => {
      return b.created - a.created; 
    });   // sorted to newest post first
  } else if(specificsFilter === 'Posted (Oldest to Most Recent)'){        
    state[arr].sort((a, b) => {
      return a.created - b.created; 
    });   // sorted to oldest post first
  } else if(specificsFilter === 'No. of Comments (High to Low)'){        
    state[arr].sort((a, b) => {
      return b.numComments - a.numComments; 
    });   // sorted to highest num of comments first
  } else if(specificsFilter === 'No. of Comments (Low to High)'){        
    state[arr].sort((a, b) => {
      return a.numComments - b.numComments; 
    });   // sorted to lowest num of comments first
  }
}