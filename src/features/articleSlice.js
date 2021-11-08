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
      // console.log(json.data.children[4].data.thumbnail_height)
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

      // UPTO HERE MON 8TH. 
      // UNHIDING ARTICLES WITH EYE WORKS FINE NOW ON BOTH 3 ARTICLE STATE PAGES AND SAVED PAGE. 
      // ONCE SAVED, IF I HIDE ON SAVED PAGE THEY HIDE ON THERE AS WELL AS OTHER 3. 
      // THEN WHEN USING EYE AGAIN ON ANY PAGE THEY COME BACK AS USUAL ON ALL PAGES WITH CORRECT CLASSES. 

    
      // MOVE ONTO REPORT ARTICLE STATE BELOW TO AMEND FOR ALL ARTICLES. 
      // REMOVE LIVE ARTICLE REDUCER IF NOT USED - DONT THINK IT IS - CHECK SIDENAV AND OTHER PAGES TO SEE IF IMPORTED ANYWHERE . REMOVE FROM REDUCERS AND FROM REDUCER.ACTIONS AT BOTTOM. 
      

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
      const {articles, id, scored} = action.payload; 
      let articlesArr;

      if(articles === 'popular'){
        articlesArr = state.popularArticles; 
      } else if(articles === 'sport'){
        articlesArr = state.sportArticles; 
      } else if(articles === 'news'){
        articlesArr = state.newsArticles; 
      }

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
        media: article.data.media, mediaEmbed: article.data.media_embed, saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'sport',
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
        saved: false, hidden: false, reported: false, scored: false, scoredUp: false, scoredDown: false, articleType: 'news',
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

export const { ellipsisToggle, addSavedArticle, removeSavedArticle, hideArticle, showArticles, reportArticle, toggleEllipsis, scoreArticle, toggleReportModal } = articleSlice.actions;

export const selectInitialState = state => state; 
export const selectInitialArticleState = state => state.articles; 

export const selectPopularArticle = state => state.articles.popularArticles;
// export const selectTrendingArticle = state => state.articles.trendingArticles;
export const selectSportArticle = state => state.articles.sportArticles;
export const selectNewsArticle = state => state.articles.newsArticles;
export const selectSavedArticle = state => state.articles.savedArticles;

export const selectDataIsLoading = state => state.articles.dataLoading;

export const selectPopularArticleIsLoading = state => state.articles.fetchPopularIsLoading; 
export const selectSportArticleIsLoading = state => state.articles.fetchSportIsLoading; 
export const selectNewsArticleIsLoading = state => state.articles.fetchNewsgIsLoading;

export default articleSlice.reducer; 