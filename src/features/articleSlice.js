import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { scoreFunc, setArticlesArr } from '../utils';

export const fetchPopularArticles = createAsyncThunk( 
  'articles/fetchPopularArticles', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching popular data...');
      const response = await fetch('https://www.reddit.com/r/popular.json?limit=10');

      const json = await response.json();
      // console.log(json.data.children)
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
    popularArticles: [],
    sportArticles: [],
    newsArticles: [],
    savedArticles: [], 
    dataLoading: true, 
    allArticlesShown: true,
    ellipsisClicked: false, 
    reportModal: false,
    modalClosed: true,
    imgClicked: false,
    searchedArticlesFound: false,
    searchedArticles: [], 
    isSearching: false,
    searchText: "",
    // fetchPopularIsLoading: true,
    // fetchSportIsLoading: true,
    // fetchNewsIsLoading: true,

    popularHasError: false,
    sportHasError: false,
    newsHasError: false,
  },
  reducers: {
    addSavedArticle: (state, action) => {
      const {id, articleType } = action.payload;
      // console.log(action.payload); // gives us type popular/sport/news from each articles state rather than from Route pathname 
      // let articles; 
      // if(articleType === 'popular'){
      //   articles = state.popularArticles; 
      // } else if(articleType === 'sport'){
      //   articles = state.sportArticles; 
      // } else if(articleType === 'news'){
      //   articles = state.newsArticles; 
      // } 

      // console.log(current(setArticlesArr(articleType, state)));
      const articlesArr = setArticlesArr(articleType, state);      

      articlesArr.forEach(article => {
        if(article.id === id){    // if id of clicked article matches
          state.savedArticles.push(article); 
          article.saved = true; 
        }
      });
    },
    removeSavedArticle: (state, action) => {
      const {id, articleType } = action.payload;
      const articlesArr = setArticlesArr(articleType, state); // access correct article state required to iterate through

      articlesArr.forEach(article => { 
        if(article.id === id){
          article.saved = false;
        }
      });

      state.savedArticles.forEach(article => {
        if(article.id === id){   // if id of click article matches
          state.savedArticles = state.savedArticles.filter(article => article.id !== id);  // savedArticles = savedArticles minus the article with matching id - removes it from saved
        }
      });
    }, 
    hideArticle: (state, action) => {
      const { id, articleType } = action.payload; 

      const articlesArr = setArticlesArr(articleType, state); 
      const articles = [articlesArr, state.savedArticles]; 

      for(let i = 0; i < articles.length; i++){
        articles[i].forEach(article => {
          if(article.id === id){
            article.hidden = true; 
          }
        });
      }

      state.allArticlesShown = false;
    }, 
    showArticles: (state, action) => {
      console.log('working'); 
      // const {id, articleType} = action.payload; 
      // const articlesArr = setArticlesArr(articleType, state);
      // console.log(articleType);   
      // no longer require above as need to run through each article state to bring all back if theres mixed hidden from different article states. 

      const articles = [state.popularArticles, state.sportArticles, state.newsArticles, state.savedArticles]; 
      for(let i = 0; i < articles.length; i++){
        articles[i].forEach(article => {
          if(article.hidden){
            article.hidden = false;
          }
        });
      }

      state.allArticlesShown = true;
    },
    reportArticle: (state, action) => {
      const { id, articleType } = action.payload; 
      const articlesArr = setArticlesArr(articleType, state); 
      const articles = [articlesArr, state.savedArticles]; 

      for(let i = 0; i < articles.length; i++){
        articles[i].forEach(article => {
          if(article.id === id) {
            article.reported = !article.reported; 
          }
        });
      }
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

      // alter state in that article's article array
      articlesArr.forEach(article => {
        scoreFunc(article, id, scored); 
      });

      // alter state in saved articles too so changes can be made and seen in there also 
      state.savedArticles.forEach(article => {
        if(article.id === id){
          scoreFunc(article, id, scored); 
        }
      });
    },
    imgToggle: (state, action) => {
      const { id, articleType } = action.payload; 
      const articlesArr = setArticlesArr(articleType, state); 
      articlesArr.forEach(article => {
        if(article.id === id){
          article.imgClicked = !article.imgClicked; 
        }
      });

      state.savedArticles.forEach(article => {
        if(article.id === id){
          article.imgClicked = !article.imgClicked; 
        }
      });

      state.imgClicked = !state.imgClicked; 
    },
    closeAllImgModals: (state, action) => {
      const allArticles = [state.popularArticles, state.sportArticles, state.newsArticles, state.savedArticles];

      allArticles.forEach(articleArr => {
        articleArr.forEach(article => {
          article.imgClicked = false; 
        });
      });

      state.imgClicked = false;
    },
    searchArticles: (state, action) => {
      const { searchText } = action.payload; 
      state.searchText = searchText; 

      const pattern = new RegExp(`${searchText}[a-zA-Z]*`, `ig`);

      const allArticles = [state.popularArticles, state.sportArticles, state.newsArticles];
      let count; // count for articles that are in the search. not defined 

      allArticles.forEach(array => {
        array.forEach(article => {
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
      });

      // if no articles match, count will be 0 or undefined. Setting searchedArticlesFound to true only if this count is 1 or more ensures it's only set once, whilst if you set it to true in an iteration, then you could have the first article true and the rest false's and it will be set to false even though i need it true
      if(count === 0 || count === undefined){
        state.searchedArticlesFound = false;
      } else {
        state.searchedArticlesFound = true;
      }
    },
    userSearch: (state, action) => {
      state.isSearching = true; 
    },
    userNoSearch: (state, action) => {
      state.isSearching = false; 
    }
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
      })
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
        state.newsArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
            url: article.data.thumbnail,
            height: article.data.thumbnail_height, 
            width: article.data.thumbnail_width, 
          },
        saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'news', imgClicked: false, 
        inSearch: false,
        });
      })
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

export const { ellipsisToggle, addSavedArticle, removeSavedArticle, hideArticle, showArticles, reportArticle, toggleEllipsis, scoreArticle, toggleReportModal, imgToggle, closeAllImgModals, searchArticles, userSearch, userNoSearch } = articleSlice.actions;

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