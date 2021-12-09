import { current } from '@reduxjs/toolkit';

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

export const setArticlesArr = (articles, state) => {
  let articlesArr;

  if(articles === 'popular'){
    articlesArr = state.popularArticles; 
  } else if(articles === 'sport'){
    articlesArr = state.sportArticles; 
  } else if(articles === 'news'){
    articlesArr = state.newsArticles; 
  }

  return articlesArr; 
}

export const scoreFunc = (article, id, scored) => {
  if(article.id === id){
    if(!article.scoredUp && !article.scoredDown){
      if(scored === 'up'){
        article.score = article.score + 1;
        article.scoredUp = true;
      } else if(scored === 'down'){
        article.score = article.score - 1;
        article.scoredDown = true;
      }
    }  // if article not yet scored, and scored up, + 1 to score, scoredUp = true. if not yet scored and scored down, - 1 to score, scoredDown = true  

    else if(article.scoredUp && scored === 'down'){
      article.score = article.score - 2;
      article.scoredDown = true;
      article.scoredUp = false;
    }   // if article already been scored up, and scored is down, minus two from score to take it one below its original score. scoredDown = true, scoredUp = false

    else if(article.scoredDown && scored === 'up'){
      article.score = article.score + 2;
      article.scoredUp = true;
      article.scoredDown = false;
    }   // if article already been scored down, and scored is up, add two to score to take it one above its original score. scoredUp = true, scoredDown = false
  }

  else if(article.scoredDown && scored === 'down'){
    if(article.score <= 0){
      article.score = 0; 
    } 
  }  // if article already scored down and scored down again, if the first down made score less than or equal to 0, remains the same, score = 0. This condition doesn't allow a score of 0 to be set to -1. 
}

export const convertUnixTimeStamp = (timeStamp) => {
  // const unixTimestamp = timeStamp;
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

  // const dateObjTime = convertToDateObjTime(humanDateFormat);

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
    const correctArr = state[`${stateFilter}Articles`];  // returns the related state. i.e. if postFilter === 'All' (user clicked All filter), correctFilter = state[allArticles], which is equal to state.allArticles.

    correctArr.forEach(post => {
      state.filteredSpecificsArray.push(post);
    });   // push posts to filteredSpecificsArray array to await sorting. 
    miniSortArr(state, specificsFilter);  // sort array and return it in the expected sorted order. 

    // console.log(stateFilter); 
    // console.log(current(correctFilter)); 
    // if(specificsFilter === 'Score (High to Low)'){
    //   state.filteredSpecificsArray.sort((a, b) => {
    //     return b.score - a.score; 
    //   });   // sorted to highest score first
    // } else if(specificsFilter === 'Score (Low to High)'){
    //   state.filteredSpecificsArray.sort((a, b) => {
    //     return a.score - b.score; 
    //   });   // sorted to lowest score first
    // } else if(specificsFilter === 'Posted (Most Recent to Oldest)'){
    //   state.filteredSpecificsArray.sort((a, b) => {
    //     return b.created - a.created; 
    //   });   // sorted to lowest score first
    // } else if(specificsFilter === 'Posted (Oldest to Most Recent)'){
    //   state.filteredSpecificsArray.sort((a, b) => {
    //     return a.created - b.created; 
    //   });   // sorted to lowest score first
    // } else if(specificsFilter === 'No. of Comments (High to Low)'){
    //   state.filteredSpecificsArray.sort((a, b) => {
    //     return b.numComments - a.numComments; 
    //   });   // sorted to lowest score first
    // } else if(specificsFilter === 'No. of Comments (Low to High)'){
    //   state.filteredSpecificsArray.sort((a, b) => {
    //     return a.numComments - b.numComments; 
    //   });   // sorted to lowest score first
    // }
  } else {    // else if there is no postFilter clicked 
    if(!state.isSearching){   // if user isn't searching (user wants to filter the current posts in the UI)..
      if(route === ''){  // if current route is popularPosts
        state.popularArticles.forEach(post => {
          state.filteredSpecificsArray.push(post);
        });  //  push popularArticles into filteredSpecs array
  
        miniSortArr(state, specificsFilter);    // sort array based on the specificFilter
      } else if(route === 'sport'){  // else if current page is sportPosts
        state.sportArticles.forEach(post => {   
          state.filteredSpecificsArray.push(post);
        });   // push sportPosts into filteredSpecs array
  
        miniSortArr(state, specificsFilter); 
      } else if(route === 'news'){   // else if current page is newsPosts
        state.newsArticles.forEach(post => {
          state.filteredSpecificsArray.push(post);
        });   // push newsPosts into filteredSpecs array
  
        miniSortArr(state, specificsFilter); 
      }
    } else {    // else if user is searching - user wants to specFilter their searched articles 
      miniSortArr(state, specificsFilter);   // return sorted arr based on spec filter
    }
  }
  
  // return state.filteredSpecificsArray;
}

// returns a sorted array dependant on filter passed in
export const miniSortArr = (state, specificsFilter) => {
  let arr;

  if(state.isSearching){  // if in searchMode..
    arr = 'searchedArticles';    //..sort searchedArr
  } else {   // if not in searchMode..
    arr = 'filteredSpecificsArray';  // ..sort filteredArr
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