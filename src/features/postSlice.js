import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { current } from '@reduxjs/toolkit';
import { scoreFunc, setPostsArr, sortSpecificsFilter } from '../utils';

export const fetchPopularPosts = createAsyncThunk( 
  'posts/fetchPopularPosts', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching popular data...');
      const response = await fetch('https://www.reddit.com/r/popular.json?limit=10');

      const json = await response.json();
      // console.log(json.data.children[2].data)
      // console.log(json.data.children[0].data.permalink)

      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchSportPosts = createAsyncThunk( 
  'posts/fetchSportPosts', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching sport data...');
      const response = await fetch('https://www.reddit.com/search.json?q=sport%20&limit=10');

      const json = await response.json();
      // console.log(json.data.children[9].data)
      // console.log(json.data.children[0].data)
      // console.log('fetching sport data complete);
      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchNewsPosts = createAsyncThunk( 
  'posts/fetchNewsPosts', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching news data...');
      const response = await fetch('https://www.reddit.com/search.json?q=news%20&limit=10');

      const json = await response.json();
      // console.log(json.data.children[0].data) 
      // console.log('fetching news data complete);
      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

const postSlice = createSlice({
  name: 'posts', 
  initialState: {
    allPosts: [], 
    popularPosts: [],
    sportPosts: [],
    newsPosts: [],
    // following 3 states used to render specified articles. couldnt use allArticles with a render condition based on if it was 'saved: true' etc as if else statements were incredibly confusing and not working in return() in Articles.js. 
    savedPosts: [],
    hiddenPosts: [],
    reportedPosts: [],
    dataLoading: true, 
    allPostsShown: true,
    ellipsisClicked: false, 
    reportModal: false,
    modalClosed: true,
    imgClicked: false,
    searchedPostsFound: false,
    searchedPosts: [],
    isSearching: false,
    searchText: "",
    // fetchPopularIsLoading: true,
    // fetchSportIsLoading: true,
    // fetchNewsIsLoading: true,
    popularHasError: false,
    sportHasError: false,
    newsHasError: false,
    filterMode: false,
    postFilter: '',
    specificFilter: '',
    specificsSortedArray: [],
    postFiltersArr: [
      { filter: 'All', checked: false, posts: 0 },
      { filter: 'Popular', checked: false, posts: 0 },
      { filter: 'Sport', checked: false, posts: 0 },
      { filter: 'News', checked: false, posts: 0 },
      { filter: 'Saved', checked: false, posts: 0 },
      { filter: 'Hidden', checked: false, posts: 0 },
      { filter: 'Reported', checked: false, posts: 0 },
    ],
    specificsFiltersArr: [
      { filter: 'Score', order: '(High to Low)', checked: false }, 
      { filter: 'Score', order: '(Low to High)', checked: false }, 
      { filter: 'Posted', order: '(Most Recent to Oldest)', checked: false }, 
      { filter: 'Posted', order: '(Oldest to Most Recent)', checked: false }, 
      { filter: 'No. of Comments', order: '(High to Low)', checked: false }, 
      { filter: 'No. of Comments', order: '(Low to High)', checked: false },
    ],
  },
  reducers: {
    savePost: (state, action) => {
      const {id, postType } = action.payload;
      const postsArr = setPostsArr(postType, state);

      const posts = [postsArr, state.allPosts, state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts];

      // iterate through all arrays. Any storing saved post change saved to opposite. if post not yet saved, it hasn't been pushed into savedPosts yet. 
      posts.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.saved = !post.saved; 
          }
        });
      });

      // access saved post and if it's saved, push it into savedPosts array. If it's been unsaved then filter savedPosts, returning only those which dont match the id
      postsArr.forEach(post => {
        if(post.id === id){
          if(post.saved){
            state.savedPosts.push(post); 
          } else {
            state.savedPosts = state.savedPosts.filter(item => item.id !== id);
          }
        }
      });
    },
    hidePost: (state, action) => {
      const { id, postType } = action.payload; 

      const postsArr = setPostsArr(postType, state); 

      const posts = [postsArr, state.allPosts, state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts];

      // iterate through all arrays. Any storing hidden post change hidden to opposite. if post not yet hidden, it hasn't been pushed into hiddenPosts yet. 
      posts.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.hidden = !post.hidden; 
          }
        });
      });

      // access hidden post and if it's hidden, push it into hiddenPosts array. If it's been unhidden then filter hiddenPosts, returning only those which dont match the id
      postsArr.forEach(post => {
        if(post.id === id){
          if(post.hidden){
            state.hiddenPosts.push(post); 
          } else {
            state.hiddenPosts = state.hiddenPosts.filter(item => item.id !== id);
          }
        }
      });

      state.allPostsShown = false;
    }, 
    showPosts: (state, action) => {
      const posts = [state.allPosts, state.popularPosts, state.sportPosts, state.newsPosts, state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts];
      
      // make any post with hidden[true] to hidden[false] in all post arrays.
      posts.forEach(array => {
        array.forEach(post => {
          if(post.hidden){
            post.hidden = false;
          }
        });
      });

      // remove all posts from hiddenPosts.
      state.hiddenPosts = []; 

      state.allPostsShown = true;
    },
    reportPost: (state, action) => {
      const { id, postType } = action.payload; 

      // console.log(id, postType); 
      const postsArr = setPostsArr(postType, state); 
      const posts = [postsArr, state.allPosts, state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts]; 

      // iterate through all arrays. Any storing reported post change reported to opposite. if post not yet reported, it hasn't been pushed into reportedPosts yet. 
      posts.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.reported = !post.reported; 
          }
        });
      });

      // access reported post and if it's reported, push it into reportedPosts array. If it's been unreported then filter reportedPosts, returning only those which dont match the id
      postsArr.forEach(post => {
        if(post.id === id){
          if(post.reported){
            state.reportedPosts.push(post); 
          } else {
            state.reportedPosts = state.reportedPosts.filter(item => item.id !== id);
          }
        }
      });
    },
    toggleReportModal: (state, action) => {
      state.modalClosed = !state.modalClosed; 
    },
    toggleEllipsis: (state, action) => {
      state.ellipsisClicked = !state.ellipsisClicked;
    },
    scorePost: (state, action) => {
      const {postType, id, scored} = action.payload; 
      const postsArr = setPostsArr(postType, state); 

      const posts = [postsArr, state.allPosts, state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts];

      posts.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            scoreFunc(post, id, scored); 
          }
        });
      });
    },
    imgToggle: (state, action) => {
      const { id, postType } = action.payload; 
      const postsArr = setPostsArr(postType, state); 

      const posts = [postsArr, state.allPosts, state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts];

      posts.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.imgClicked = !post.imgClicked; 
          }
        });
      });

      state.imgClicked = !state.imgClicked; 
    },
    closeAllImgModals: (state, action) => {
      const posts = [state.allPosts, state.popularPosts, state.sportPosts, state.newsPosts,state.savedPosts, state.hiddenPosts, state.reportedPosts, state.specificsSortedArray, state.searchedPosts];

      posts.forEach(array => {
        array.forEach(post => {
          post.imgClicked = false; 
        });
      });

      state.imgClicked = false;
    },
    searchPosts: (state, action) => {
      const { searchText } = action.payload; 
      state.searchText = searchText; 

      if(searchText){

        const pattern = new RegExp(`${searchText}[a-zA-Z]*`, `ig`);

        let count = 0; // count for posts that are in the search

        state.allPosts.forEach(post => {
          if(post.title.match(pattern)){
            // console.log('working')
            // console.log(current(post));
            post.inSearch = true;
          } else if(!post.title.match(pattern)){
            post.inSearch = false;
          }

          if(post.inSearch){
            count++;    // add 1 if post title is in user search. count will reset from 0 each time so that the count only counts up based on live state of searchText and doesnt keep adding posts on top of previous states (ie if you type 'h' the count will be very big cos a lot of titles will have h in. if you type 'ho' there will be less, and cos the count resets, all those with 'h' aren't in the count - just 'ho')
          }
        });

        // if no posts match, count will be 0. Setting searchedPostsFound to true only if this count is 1 or more ensures it's only set once, whilst if you set it to true in an iteration, then you could have the first post true and the rest false's and it will be set to false even though its expected to be true
        if(count === 0){
          state.searchedPostsFound = false;
        } else {
          state.searchedPostsFound = true;
        }
      }
    },
    searchedPostsFound: (state, action) => {
      state.searchedPosts = [];   // resets searchPosts each execution so that multiple of the same post aren't pushed into searchedPosts. 
      
      if(state.isSearching){   // if user searching 
        state.allPosts.forEach(post => {   // iterate through all posts
          if(post.inSearch){   // if it's in the search
            state.searchedPosts.push(post); 
          }
        });
      }
    },
    userSearch: (state, action) => {
      // if user begins using the search feature, turn filterMode OFF and reset ALL filter states. 
      state.isSearching = true; 
      state.filterMode = false;

      state.postFiltersArr.forEach(post => {
        post.checked = false;
      });

      state.specificsFiltersArr.forEach(post => {
        post.checked = false;
      });

      state.postFilter = '';
      state.specificFilter = ''; 
      state.specificsSortedArray = []; 
    },
    userNoSearch: (state, action) => {
      state.isSearching = false; 
      state.searchedPostsFound = false;
      state.searchedPosts = []; 

      state.allPosts.forEach(post => {
        post.inSearch = false;
      });
    },
    postsFilterClicked: (state, action) => {
      const { filter } = action.payload; 
      // console.log(filter);  // e.target.value e.g. 'All'  

      state.postFiltersArr.forEach(postFilter => {
        if(postFilter.filter === filter){
          postFilter.checked = !postFilter.checked;
        } else {
          postFilter.checked = false; 
        }
      });

      state.filterMode = true; 

      // if filterMode is ON, reset all search related states
      if(state.filterMode){
        state.isSearching = false;
        state.searchedPostsFound = false;
        state.searchedPosts = []; 
      }
      
      if(state.postFilter === filter){   // if current post filter state equals passed in filter (filter is double clicked - checked then unchecked)... 
        state.postFilter = ''; // ...reset state
        if(state.specificFilter === ''){   // ...and if no specific filter is checked...
          state.filterMode = false;   // ...filterMode is OFF
        }
      } else if(state.postFilter === ''){   // else if no filter has been clicked
        state.postFilter = filter;  // used to render 
        state.specificFilter = ''; 
        state.specificsFiltersArr.forEach(filter => {
          if(filter.checked){
            filter.checked = false;
          }
        });
      } else {   // if a filter has been clicked but then user clicks to another 
        state.postFilter = filter;   // used to render
      }
    },
    specificsFilterClicked: (state, action) => {
      const { filter, path } = action.payload; 

      // console.log(path);  // '/'  ,  '/sport'  ,  '/news' 
      const route = path.substring(1); 
      // console.log(route);   // ''  ,  'sport'  ,  'news' 

      if(state.isSearching && filter){  // if in searchMode and a spec filter is clicked
        state.specificsFiltersArr.forEach(specificFilter => {
          // specificFilter.checked = false;
          if(filter.includes(specificFilter.filter) && filter.includes(specificFilter.order)){   // access correct filter state
            specificFilter.checked = !specificFilter.checked; // toggle checked 
          } else {   // for all other specificFilter states
            specificFilter.checked = false;   // change checked to false
          }
        });

        sortSpecificsFilter(state, filter, state.postFilter, route); // returns the correct sorted array that the user requested, which is saved to state.specificsSortedArray, so it automatically updates initialState when called
      } else {
        if(filter){   // if filter is truthy (reducer executed from a specsFilter click) - we declare filter as undefined when executing from a postFilter click

          // check/uncheck the clicked filter & change state
          state.specificsFiltersArr.forEach(specificFilter => {
            // specificFilter.checked = false;
            if(filter.includes(specificFilter.filter) && filter.includes(specificFilter.order)){   // access correct filter state
              specificFilter.checked = !specificFilter.checked; // toggle checked 
            } else {   // for all other specificFilter states
              specificFilter.checked = false;   // change checked to false
            }
          });
    
          state.filterMode = true; 
    
          if(state.filterMode){
            state.isSearching = false;
              state.searchedPostsFound = false;
          }
    
          state.specificsSortedArray = []; // reset to empty
    
          if(state.specificFilter === filter){   // if current specifics filter state equals passed in filter (filter is double clicked - checked then unchecked)... 
            state.specificFilter = ''; // ...reset state
            if(!state.postFilter){   // ...and if no post filter is checked...
              state.filterMode = false;   // ...filterMode is OFF
            }
          } else if(state.specificFilter === ''){   // else if no filter has been clicked
            state.specificFilter = filter;  // used to render 
            state.filterMode = true;   // used to render
          } else {   // if a filter has been clicked but then user clicks to another 
            state.specificFilter = filter;   // used to render
          }
    
          sortSpecificsFilter(state, filter,  state.postFilter, route); // returns the correct sorted array that the user requested, which is saved to state.specificsSortedArray, so it automatically updates initialState when called
    
        } else if(!filter) {  // else if filter is falsy (reducer executed from a postFilter click)
          if(state.postFilter){  // if a different post filter clicked..reset all spec filters
            state.specificFilter = ''; 
            state.specificsSortedArray = [];
            state.specificsFiltersArr.forEach(filter => {
              filter.checked = false;
            });  
          } else {   // else if postFilter falsy (user unchecked the checked postFilter).. reset all spec filters and filterMode OFF 
            state.specificFilter = ''; 
            state.specificsSortedArray = []; 
            state.specificsFiltersArr.forEach(filter => {
              filter.checked = false;
            });   
            state.filterMode = false; 
          }
        } 
      }
    }, 
    userNoFilter: (state, action) => {
      state.filterMode = false; 
      state.postFilter = '';
      state.specificFilter = '';
      state.specificsSortedArray = []; 
      state.postFiltersArr.forEach(post => {
        post.checked = false;
      });
      state.specificsFiltersArr.forEach(post => {
        post.checked = false;
      });
    },
    numOfPostsToState: (state, action) => {
      const { All, Popular, News, Sport, Saved, Hidden, Reported } = action.payload; 

      const arr = [All, Popular, News, Sport, Saved, Hidden, Reported];
      state.postFiltersArr.forEach(post => {
        arr.forEach(item => {   
          if(item.id === post.filter){
            post.posts = item.data; 
          }  // save the num of posts for each post filter 
        })
      });
    },
  },
  extraReducers: {
    [fetchPopularPosts.pending]: (state, action) => {
      // console.log('fetchPopularPosts.pending')
      // state.fetchPopularIsLoading = true;

      state.dataLoading = true;

      state.popularHasError = false;
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      // console.log('fetchPopularPosts.fulfilled')
      // state.fetchPopularIsLoading = false;

      state.dataLoading = true;

      state.popularHasError = false;

      action.payload.forEach(post => {
        state.allPosts.push({ id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: {
          url: post.data.thumbnail,
          height: post.data.thumbnail_height, 
          width: post.data.thumbnail_width, 
        },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        postType: 'popular',
        imgClicked: false, 
        inSearch: false,
        });

        state.popularPosts.push({ id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: {
            url: post.data.thumbnail,
            height: post.data.thumbnail_height, 
            width: post.data.thumbnail_width, 
          },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        postType: 'popular',
        imgClicked: false, 
        inSearch: false,
        });
      });
      // console.log(current(state))
      // console.log(action.payload)
    },      
    [fetchPopularPosts.rejected]: (state, action) => {
      // console.log('fetchPopularPosts.rejected')
      // state.fetchPopularIsLoading = false;

      state.dataLoading = true;
      
      state.popularHasError = true;
    },
    [fetchSportPosts.pending]: (state, action) => {
      // console.log('fetchSportPosts.pending')
      // state.fetchSportIsLoading = true;

      state.dataLoading = true;

      state.sportHasError = false;
    },
    [fetchSportPosts.fulfilled]: (state, action) => {
      // console.log('fetchSportPosts.fulfilled')
      // state.fetchSportIsLoading = false;

      state.dataLoading = true;

      state.sportHasError = false;

      action.payload.forEach(post => {
        state.allPosts.push({ id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: {
          url: post.data.thumbnail,
          height: post.data.thumbnail_height, 
          width: post.data.thumbnail_width, 
        },
        media: post.data.media, mediaEmbed: post.data.media_embed, saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, postType: 'sport', imgClicked: false, 
        inSearch: false,
        });

        state.sportPosts.push({ id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: {
            url: post.data.thumbnail,
            height: post.data.thumbnail_height, 
            width: post.data.thumbnail_width, 
          },
        media: post.data.media, mediaEmbed: post.data.media_embed, saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, postType: 'sport', imgClicked: false, 
        inSearch: false,
        });
      });

      // console.log(current(state))
    },
    [fetchSportPosts.rejected]: (state, action) => {
      // console.log('fetchSportPosts.rejected')
      // state.fetchSportIsLoading = false;

      state.dataLoading = true;

      state.sportHasError = true;
    },
    [fetchNewsPosts.pending]: (state, action) => {
      // console.log('fetchNewsPosts.pending')
      // state.fetchNewsIsLoading = true;

      state.dataLoading = true;

      state.newsHasError = false;
    },
    [fetchNewsPosts.fulfilled]: (state, action) => {
      // console.log('fetchNewsPosts.fulfilled')
      // state.fetchNewsIsLoading = false;

      state.dataLoading = false;

      state.newsHasError = false;

      action.payload.forEach(post => {
        state.allPosts.push({ id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: {
          url: post.data.thumbnail,
          height: post.data.thumbnail_height, 
          width: post.data.thumbnail_width, 
        },
        saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, postType: 'news', imgClicked: false, 
        inSearch: false,
        });

        state.newsPosts.push({ id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: {
            url: post.data.thumbnail,
            height: post.data.thumbnail_height, 
            width: post.data.thumbnail_width, 
          },
        saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, postType: 'news', imgClicked: false, 
        inSearch: false,
        });
      });

      // console.log(current(state))
    },
    [fetchNewsPosts.rejected]: (state, action) => {
      // console.log('fetchNewsPosts.rejected')
      // state.fetchNewsIsLoading = false;

      state.dataLoading = false;

      state.newsHasError = true;
    },
  }
});

export const { ellipsisToggle, savePost, hidePost, showPosts, reportPost, toggleEllipsis, scorePost, toggleReportModal, imgToggle, closeAllImgModals, searchPosts, userSearch, userNoSearch, postsFilterClicked, specificsFilterClicked, userNoFilter, numOfPostsToState, searchedPostsFound } = postSlice.actions;

export const selectInitialState = state => state; 
export const selectInitialPostsState = state => state.posts; 
export const selectIsSearching = state => state.posts.isSearching;
export const selectSearch = state => state.posts.searchText;
export const selectToggleSideNav = state => state.sideNav.toggleSideNav;
export const selectFilterMode = state => state.posts.filterMode;
export const selectPostFilter = state => state.posts.postFilter;
export const selectPostFiltersArr = state => state.posts.postFiltersArr;
export const selectSpecificFiltersArr = state => state.posts.specificsFiltersArr
export const selectSpecificsFilter = state => state.posts.specificFilter; 
export const selectPopularPost = state => state.posts.popularPosts;
export const selectSportPost = state => state.posts.sportPosts;
export const selectNewsPost = state => state.posts.newsPosts;
export const selectSavedPost = state => state.posts.savedPosts;
export const selectSearchedPost = state => state.posts.searchedPosts;
export const selectDataIsLoading = state => state.posts.dataLoading;
export const selectPopularPostsIsLoading = state => state.posts.fetchPopularIsLoading; 
export const selectSportPostsIsLoading = state => state.posts.fetchSportIsLoading; 
export const selectNewsPostsIsLoading = state => state.posts.fetchNewsIsLoading;

export default postSlice.reducer; 