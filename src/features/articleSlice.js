import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { scoreFunc, setArticlesArr, sortSpecificsFilter, sortArr, miniSortArr } from '../utils';

export const fetchPopularArticles = createAsyncThunk( 
  'articles/fetchPopularArticles', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching popular data...');
      const response = await fetch('https://www.reddit.com/r/popular.json?limit=10');

      const json = await response.json();
      // console.log(json.data.children[0].data.id)
      // console.log(json.data.children[4].data)
      // console.log(json.data.children[4].data)
      // console.log('fetching popular data complete);
      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchSportArticles = createAsyncThunk( 
  'articles/fetchSportArticles', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching sport data...');

      const response = await fetch('https://www.reddit.com/search.json?q=sport%20&limit=10');

      const json = await response.json();
      // console.log(json);
      // console.log(json.data.children)
      // console.log(json.data.children[8].data.media) 
      // console.log(json.data.children[8].data.media_embed) 

      // console.log('fetching sport data complete);
      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchNewsArticles = createAsyncThunk( 
  'articles/fetchNewsArticles', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching news data...');

      const response = await fetch('https://www.reddit.com/search.json?q=news%20&limit=10');

      const json = await response.json();
      // console.log(json);
      // console.log(json.data.children)
      // console.log(json.data.children[1].data) 

      // console.log('fetching news data complete);
      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

const articleSlice = createSlice({
  name: 'articles', 
  initialState: {
    allArticles: [], 
    popularArticles: [],
    sportArticles: [],
    newsArticles: [],
    // HAVE TO INCLUDE THE NEXT THREE ARRAY STATES AS THESE WILL BE USED TO RENDER THE ARTICLES FOR THE FILTERED CONDITIONS BCOS I CANT DO IF STATEMENTS IN THE RENDER RETURN - COULD TRY ONCE MORE TO ITERATE THROUGH THE ALLARTICLES ARRAY AS DONT HAVE TO USE AS MANY IF ELSE STATEMENTS
    savedArticles: [], 
    hiddenArticles: [],
    reportedArticles: [],
    dataLoading: true, 
    allArticlesShown: true,
    ellipsisClicked: false, 
    reportModal: false,
    modalClosed: true,
    imgClicked: false,
    searchedArticlesFound: false,
    searchedArticles: [], // dont think this has a purpose/use
    isSearching: false,
    searchText: "",
    // fetchPopularIsLoading: true,
    // fetchSportIsLoading: true,
    // fetchNewsIsLoading: true,

    popularHasError: false,
    sportHasError: false,
    newsHasError: false,
    // specificsFilterChecked: false,
    filterMode: false,
    filteredPosts: '',
    filteredSpecifics: '',
    filteredSpecificsArray: [],
    postFilters: [
      { filter: 'All', checked: false, posts: 0 },
      { filter: 'Popular', checked: false, posts: 0 },
      { filter: 'News', checked: false, posts: 0 },
      { filter: 'Sport', checked: false, posts: 0 },
      { filter: 'Saved', checked: false, posts: 0 },
      { filter: 'Hidden', checked: false, posts: 0 },
      { filter: 'Reported', checked: false, posts: 0 },
    ],
    specificsFilters: [
      { filter: 'Score', order: '(High to Low)', checked: false }, 
      { filter: 'Score', order: '(Low to High)', checked: false }, 
      { filter: 'Posted', order: '(Most Recent to Oldest)', checked: false }, 
      { filter: 'Posted', order: '(Oldest to Most Recent)', checked: false }, 
      { filter: 'No. of Comments', order: '(High to Low)', checked: false }, 
      { filter: 'No. of Comments', order: '(Low to High)', checked: false },
    ],
  },
  reducers: {
    saveArticle: (state, action) => {
      const {id, articleType } = action.payload;
      const articlesArr = setArticlesArr(articleType, state);

      const articles = [articlesArr, state.allArticles, state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles];

      // iterate through all arrays. Any storing saved post change saved to opposite. if post not yet saved, it hasn't been pushed into savedArticles yet. 
      articles.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.saved = !post.saved; 
          }
        });
      });

      // access saved post and if it's saved, push it into savedArticles array. If it's been unsaved then filter savedArticles, returning only those which dont match the id
      articlesArr.forEach(post => {
        if(post.id === id){
          if(post.saved){
            state.savedArticles.push(post); 
          } else {
            state.savedArticles = state.savedArticles.filter(item => item.id !== id);
          }
        }
      });
    },
    hideArticle: (state, action) => {
      const { id, articleType } = action.payload; 

      const articlesArr = setArticlesArr(articleType, state); 

      const articles = [articlesArr, state.allArticles, state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles];

      // iterate through all arrays. Any storing hidden post change hidden to opposite. if post not yet hidden, it hasn't been pushed into hiddenArticles yet. 
      articles.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.hidden = !post.hidden; 
          }
        });
      });

      // access hidden post and if it's hidden, push it into hiddenArticles array. If it's been unhidden then filter hiddenArticles, returning only those which dont match the id
      articlesArr.forEach(post => {
        if(post.id === id){
          if(post.hidden){
            state.hiddenArticles.push(post); 
          } else {
            state.hiddenArticles = state.hiddenArticles.filter(item => item.id !== id);
          }
        }
      });

      state.allArticlesShown = false;
    }, 
    showArticles: (state, action) => {
      const articles = [state.allArticles, state.popularArticles, state.sportArticles, state.newsArticles, state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles];
      
      // make any article with hidden[true] to hidden[false] in all post arrays.
      articles.forEach(array => {
        array.forEach(article => {
          if(article.hidden){
            article.hidden = false;
          }
        });
      });

      // remove all posts from hiddenPosts.
      state.hiddenArticles = []; 

      state.allArticlesShown = true;
    },
    reportArticle: (state, action) => {
      const { id, articleType } = action.payload; 

      // console.log(id, articleType); 
      const articlesArr = setArticlesArr(articleType, state); 
      const articles = [articlesArr, state.allArticles, state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles]; 

      // iterate through all arrays. Any storing reported post change reported to opposite. if post not yet reported, it hasn't been pushed into reportedArticles yet. 
      articles.forEach(array => {
        array.forEach(post => {
          if(post.id === id){
            post.reported = !post.reported; 
          }
        });
      });

      // access reported post and if it's reported, push it into reportedArticles array. If it's been unreported then filter reportedArticles, returning only those which dont match the id
      articlesArr.forEach(post => {
        if(post.id === id){
          if(post.reported){
            state.reportedArticles.push(post); 
          } else {
            state.reportedArticles = state.reportedArticles.filter(item => item.id !== id);
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
    scoreArticle: (state, action) => {
      const {articleType, id, scored} = action.payload; 
      const articlesArr = setArticlesArr(articleType, state); 

      const articles = [articlesArr, state.allArticles, state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles];

      articles.forEach(array => {
        array.forEach(article => {
          if(article.id === id){
            scoreFunc(article, id, scored); 
          }
        })
      })
      // alter state in that article's article array
      // articlesArr.forEach(article => {
      //   scoreFunc(article, id, scored); 
      // });

      // alter state in saved articles too so changes can be made and seen in there also 
      // state.savedArticles.forEach(article => {
      //   if(article.id === id){
      //     scoreFunc(article, id, scored); 
      //   }
      // });
    },
    imgToggle: (state, action) => {
      const { id, articleType } = action.payload; 
      const articlesArr = setArticlesArr(articleType, state); 

      const articles = [articlesArr, state.allArticles, state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles];

      articles.forEach(array => {
        array.forEach(article => {
          if(article.id === id){
            article.imgClicked = !article.imgClicked; 
          }
        });
      });

      // articlesArr.forEach(article => {
      //   if(article.id === id){
      //     article.imgClicked = !article.imgClicked; 
      //   }
      // });

      // state.savedArticles.forEach(article => {
      //   if(article.id === id){
      //     article.imgClicked = !article.imgClicked; 
      //   }
      // });

      state.imgClicked = !state.imgClicked; 
    },
    closeAllImgModals: (state, action) => {
      // const allArticles = [state.popularArticles, state.sportArticles, state.newsArticles, state.savedArticles];

      const articles = [state.allArticles, state.popularArticles, state.sportArticles, state.newsArticles,state.savedArticles, state.hiddenArticles, state.reportedArticles, state.filteredSpecificsArray, state.searchedArticles];

      articles.forEach(array => {
        array.forEach(article => {
          article.imgClicked = false; 
        });
      });

      state.imgClicked = false;
    },
    searchArticles: (state, action) => {
      const { searchText } = action.payload; 
      state.searchText = searchText; 

      const pattern = new RegExp(`${searchText}[a-zA-Z]*`, `ig`);

      // const allArticles = [state.allArticles, state.popularArticles, state.sportArticles, state.newsArticles, state.savedArticles, state.sportArticles, state.newsArticles];
      let count = 0; // count for articles that are in the search. not defined 

      // allArticles.forEach(array => {
        state.allArticles.forEach(article => {
          if(article.title.match(pattern)){
            // console.log('working')
            // console.log(current(article));
            article.inSearch = true;
          } else if(!article.title.match(pattern)){
            article.inSearch = false;
          }

          if(article.inSearch){
            count++;    // add 1 if article title is in user search. As count is undefined each time this action is called, the count will reset from 0 each time so that the count only counts up based on live state on searchText and doesnt keep adding on from previous states (ie if you type 'h' the count will be very big cos a lot of titles will have h in. if you type 'ho' there will be less, and cos the count resets, all those with 'h' aren't in the count - just 'ho')
            // console.log(count); 
          }
        });
      // });

      // state.allArticles.forEach(post => {
      //   if(post.inSearch){
      //     state.searchedArticles.push(post); 
      //   }
      // });

      // if no articles match, count will be 0. Setting searchedArticlesFound to true only if this count is 1 or more ensures it's only set once, whilst if you set it to true in an iteration, then you could have the first article true and the rest false's and it will be set to false even though i need it true
      if(count === 0){
        state.searchedArticlesFound = false;
      } else {
        state.searchedArticlesFound = true;
      }
    },
    searchedArticlesFound: (state, action) => {
      state.searchedArticles = [];   // resets searchArticles each execution so that multiple of the same post aren't pushed into searchedArticles. 
      
      if(state.isSearching){   // if there is 
        state.allArticles.forEach(post => {
          if(post.inSearch){
            state.searchedArticles.push(post); 
          }
        });
      }
    },
    userSearch: (state, action) => {
      // if user begins using the search feature, turn filterMode OFF and reset ALL filter states. 
      state.isSearching = true; 
      state.filterMode = false;

      state.postFilters.forEach(post => {
        post.checked = false;
      });

      state.specificsFilters.forEach(post => {
        post.checked = false;
      });

      state.filteredPosts = '';
      state.filteredSpecifics = ''; 
      state.filteredSpecificsArray = []; 
    },
    userNoSearch: (state, action) => {
      state.isSearching = false; 
      state.searchedArticlesFound = false;
      state.searchedArticles = []; 

      state.allArticles.forEach(post => {
        post.inSearch = false;
      });
    },
    postsFilterClicked: (state, action) => {
      const { filter } = action.payload; 
      // console.log(filter);  // e.target.value e.g. 'All'  

      state.postFilters.forEach(postFilter => {
        if(postFilter.filter === filter){
          postFilter.checked = !postFilter.checked;
        } else {
          postFilter.checked = false; 
        }
      });

      state.filterMode = true; 

      if(state.filterMode){
        state.isSearching = false;
        state.searchedArticlesFound = false;
        state.searchedArticles = []; 
      }
      // state.filterMode && (state.isSearching = false);  // if filterMode is ON, make searchMode OFF 

      if(state.filteredPosts === filter){   // if current post filter state equals passed in filter (filter is double clicked - checked then unchecked)... 
        state.filteredPosts = ''; // ...reset state
        if(state.filteredSpecifics === ''){   // ...and if no specific filter is checked...
          state.filterMode = false;   // ...filterMode is OFF
        }
      } else if(state.filteredPosts === ''){   // else if no filter has been clicked
        state.filteredPosts = filter;  // used to render 
        state.filteredSpecifics = ''; 
        state.specificsFilters.forEach(filter => {
          if(filter.checked){
            filter.checked = false;
          }
        });
        // state.filterMode = true;   // used to render
      } else {   // if a filter has been clicked but then user clicks to another 
        state.filteredPosts = filter;   // used to render
      }
    },
    specificsFilterClicked: (state, action) => {



      // NEED TO WRITE CODE THAT LETS US FILTER THE SEARCHED ARTICLES. ONLY FOR SPECIFICS FILTERS COS POST FILTERS NOT APPLICABLE. 
      // - clicking spec filter doesnt turn off search mode
      // - if searchMode on, sort searchedArticles based on filter 
      // - need to do a if(searchMode){ for all new code } else { for all existing code } 
      // - will need to change search reducers maybe to not turn off filter mode if search again ? maybe not bcos if they re-search then i owuldnt want filtere on anyway, if re-search, turn spec filter states back to original . 


      const { filter, path } = action.payload; 

      // console.log(path);  // '/'  ,  '/sport'  ,  '/news' 
      const route = path.substring(1); 
      // console.log(route);   // ''  ,  'sport'  ,  'news' 

      if(state.isSearching && filter){  // if in searchMode and a spec filter is clicked
        state.specificsFilters.forEach(specificFilter => {
          // specificFilter.checked = false;
          if(filter.includes(specificFilter.filter) && filter.includes(specificFilter.order)){   // access correct filter state
            specificFilter.checked = !specificFilter.checked; // toggle checked 
          } else {   // for all other specificFilter states
            specificFilter.checked = false;   // change checked to false
          }
        });

        sortSpecificsFilter(state, filter, state.filteredPosts, route); // returns the correct sorted array that the user requested, which is saved to state.filteredSpecificsArray, so it automatically updates initialState when called
      } else {
        if(filter){   // if filter is truthy (reducer executed from a specsFilter click) - we declare filter as undefined when executing from a postFilter click

          // check/uncheck the clicked filter & change state
            state.specificsFilters.forEach(specificFilter => {
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
              state.searchedArticlesFound = false;
            }
    
            state.filteredSpecificsArray = []; // reset to empty
    
          
            if(state.filteredSpecifics === filter){   // if current specifics filter state equals passed in filter (filter is double clicked - checked then unchecked)... 
              state.filteredSpecifics = ''; // ...reset state
              if(!state.filteredPosts){   // ...and if no post filter is checked...
                state.filterMode = false;   // ...filterMode is OFF
              }
            } else if(state.filteredSpecifics === ''){   // else if no filter has been clicked
              state.filteredSpecifics = filter;  // used to render 
              state.filterMode = true;   // used to render
            } else {   // if a filter has been clicked but then user clicks to another 
              state.filteredSpecifics = filter;   // used to render
            }
    
            sortSpecificsFilter(state, filter,  state.filteredPosts, route); // returns the correct sorted array that the user requested, which is saved to state.filteredSpecificsArray, so it automatically updates initialState when called
    
          } else if(!filter) {  // else if filter is falsy (reducer executed from a postFilter click)
            if(state.filteredPosts){  // if a different post filter clicked..reset all spec filters
              state.filteredSpecifics = ''; 
              state.filteredSpecificsArray = [];
              state.specificsFilters.forEach(filter => {
                filter.checked = false;
              });  
            } else {   // else if filteredPosts falsy (user unchecked the checked postFilter).. reset all spec filters and filterMode OFF 
              state.filteredSpecifics = ''; 
              state.filteredSpecificsArray = []; 
              state.specificsFilters.forEach(filter => {
                filter.checked = false;
              });   
              state.filterMode = false; 
            }
          } 
      }
    }, 
    userNoFilter: (state, action) => {
      // cant merge this and search reducers bcos it would turn off both modes and sometimes we are using one to turn the other off so would counteract itself 
      state.filterMode = false; 
      state.filteredPosts = '';
      state.filteredSpecifics = '';
      state.postFilters.forEach(post => {
        post.checked = false;
      });
      state.specificsFilters.forEach(post => {
        post.checked = false;
      });
    },
    numOfPostsToState: (state, action) => {
      const { All, Popular, News, Sport, Saved, Hidden, Reported } = action.payload; 

      const arr = [All, Popular, News, Sport, Saved, Hidden, Reported];
      state.postFilters.forEach(post => {
        arr.forEach(item => {   
          if(item.id === post.filter){
            post.posts = item.data; 
          }  // save the num of posts for each post filter 
        })
      });
    },
  },
  extraReducers: {
    [fetchPopularArticles.pending]: (state, action) => {
      // console.log('fetchPopularArticles.pending')
      // state.fetchPopularIsLoading = true;

      state.dataLoading = true;

      state.popularHasError = false;
    },
    [fetchPopularArticles.fulfilled]: (state, action) => {
      // console.log('fetchPopularArticles.fulfilled')
      // state.fetchPopularIsLoading = false;

      state.dataLoading = true;

      state.popularHasError = false;

      action.payload.forEach(article => {
        state.allArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
          url: article.data.thumbnail,
          height: article.data.thumbnail_height, 
          width: article.data.thumbnail_width, 
        },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        articleType: 'popular',
        imgClicked: false, 
        inSearch: false,
        });

        state.popularArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
            url: article.data.thumbnail,
            height: article.data.thumbnail_height, 
            width: article.data.thumbnail_width, 
          },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        articleType: 'popular',
        imgClicked: false, 
        inSearch: false,
        });
      });
      // console.log(current(state))
      // console.log(action.payload)
    },      
    [fetchPopularArticles.rejected]: (state, action) => {
      // console.log('fetchPopularArticles.rejected')
      // state.fetchPopularIsLoading = false;

      state.dataLoading = true;
      
      state.popularHasError = true;
    },
    [fetchSportArticles.pending]: (state, action) => {
      // console.log('fetchSportArticles.pending')
      // state.fetchSportIsLoading = true;

      state.dataLoading = true;

      state.sportHasError = false;
    },
    [fetchSportArticles.fulfilled]: (state, action) => {
      // console.log('fetchSportArticles.fulfilled')
      // state.fetchSportIsLoading = false;

      state.dataLoading = true;

      state.sportHasError = false;

      action.payload.forEach(article => {
        state.allArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
          url: article.data.thumbnail,
          height: article.data.thumbnail_height, 
          width: article.data.thumbnail_width, 
        },
        media: article.data.media, mediaEmbed: article.data.media_embed, saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'sport', imgClicked: false, 
        inSearch: false,
        });

        state.sportArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
            url: article.data.thumbnail,
            height: article.data.thumbnail_height, 
            width: article.data.thumbnail_width, 
          },
        media: article.data.media, mediaEmbed: article.data.media_embed, saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'sport', imgClicked: false, 
        inSearch: false,
        });
      });

      // console.log(current(state))
      // console.log(action.payload)
    },
    [fetchSportArticles.rejected]: (state, action) => {
      // console.log('fetchSportArticles.rejected')
      // state.fetchSportIsLoading = false;

      state.dataLoading = true;

      state.sportHasError = true;
    },
    [fetchNewsArticles.pending]: (state, action) => {
      // console.log('fetchNewsArticles.pending')
      // state.fetchNewsIsLoading = true;

      state.dataLoading = true;

      state.newsHasError = false;
    },
    [fetchNewsArticles.fulfilled]: (state, action) => {
      // console.log('fetchNewsArticles.fulfilled')
      // state.fetchNewsIsLoading = false;

      state.dataLoading = false;

      state.newsHasError = false;

      action.payload.forEach(article => {
        state.allArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
          url: article.data.thumbnail,
          height: article.data.thumbnail_height, 
          width: article.data.thumbnail_width, 
        },
        saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'news', imgClicked: false, 
        inSearch: false,
        });

        state.newsArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
            url: article.data.thumbnail,
            height: article.data.thumbnail_height, 
            width: article.data.thumbnail_width, 
          },
        saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'news', imgClicked: false, 
        inSearch: false,
        });
      });

      // console.log(current(state))
      // console.log(action.payload)
    },
    [fetchNewsArticles.rejected]: (state, action) => {
      // console.log('fetchNewsArticles.rejected')
      // state.fetchNewsIsLoading = false;

      state.dataLoading = false;

      state.newsHasError = true;
    },
  }
});

export const { ellipsisToggle, saveArticle, hideArticle, showArticle, showArticles, reportArticle, toggleEllipsis, scoreArticle, toggleReportModal, imgToggle, closeAllImgModals, searchArticles, userSearch, userNoSearch, postsFilterClicked, specificsFilterClicked, sortFilteredArray, userNoFilter, numOfPostsToState, searchedArticlesFound } = articleSlice.actions;

export const selectInitialState = state => state; 
export const selectInitialArticleState = state => state.articles; 

export const selectPopularArticle = state => state.articles.popularArticles;
// export const selectTrendingArticle = state => state.articles.trendingArticles;
export const selectSportArticle = state => state.articles.sportArticles;
export const selectNewsArticle = state => state.articles.newsArticles;
export const selectSavedArticle = state => state.articles.savedArticles;
export const selectSearchedArticle = state => state.articles.searchedArticles;

export const selectDataIsLoading = state => state.articles.dataLoading;

export const selectPopularArticleIsLoading = state => state.articles.fetchPopularIsLoading; 
export const selectSportArticleIsLoading = state => state.articles.fetchSportIsLoading; 
export const selectNewsArticleIsLoading = state => state.articles.fetchNewsgIsLoading;

export default articleSlice.reducer; 