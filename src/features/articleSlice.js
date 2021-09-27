import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const fetchPopularArticles = createAsyncThunk( 
  'articles/fetchPopularArticles', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching popular data...');
      const response = await fetch('https://www.reddit.com/r/popular.json?limit=10');

      const json = await response.json();
      // console.log(json.data.children)
      // console.log(json.data.children[4].data.thumbnail_height)
      // console.log(json.data.children[4].data.width)
      // console.log('fetching popular data complete);
      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchTrendingArticles = createAsyncThunk( 
  'articles/fetchTrendingArticles', // must be same as in extraReducers 
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching trending data...');

      const response = await fetch('https://www.reddit.com/r/trending.json?limit=10');

      const json = await response.json();
      // console.log(json);
      // console.log(json.data.children)
      // console.log(json.data.children[1].data) 

      // console.log('fetching trending data complete);
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
    trendingArticles: [],
    sportArticles: [],
    newsArticles: [],
    dataLoading: true, 

    // fetchPopularIsLoading: true,
    // fetchTrendingIsLoading: true,
    // fetchSportIsLoading: true,
    // fetchNewsIsLoading: true,

    popularHasError: false,
    trendingHasError: false,
    sportHasError: false,
    newsHasError: false,
  },
  reducers: {},
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
          }
        });
      })
      // console.log(current(state))
      // console.log(action.payload)
    },

      //   article.data.thumbnail && article.data.thumbnail.includes('https') ? state.articlesWithThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, thumbnail: article.data.thumbnail, thumbnailHeight: article.data.thumbnail_height, thumbnailWidth: article.data.thumbnail_width }) : state.articlesWithoutThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments });
      // });
      
    [fetchPopularArticles.rejected]: (state, action) => {
      // console.log('fetchPopularArticles.rejected')
      // state.fetchPopularIsLoading = false;

      state.dataLoading = true;
      
      state.popularHasError = true;
    },
    [fetchTrendingArticles.pending]: (state, action) => {
      // console.log('fetchTrendingArticles.pending')
      // state.fetchTrendingIsLoading = true;

      state.dataLoading = true;

      state.trendingHasError = false;
    },
    [fetchTrendingArticles.fulfilled]: (state, action) => {
      // console.log('fetchTrendingArticles.fulfilled')
      // state.fetchTrendingIsLoading = false;

      state.dataLoading = true;

      state.trendingHasError = false;

      action.payload.forEach(article => {
        state.trendingArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url
        });
      })
      // console.log(current(state))
      // console.log(action.payload)
    },
    [fetchTrendingArticles.rejected]: (state, action) => {
      // console.log('fetchTrendingArticles.rejected')
      // state.fetchTrendingIsLoading = false;

      state.dataLoading = true;

      state.trendingHasError = true;
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
        media: article.data.media, mediaEmbed: article.data.media_embed
        });
      })
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
          }
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

export const { } = articleSlice.actions;

export const initialState = state => state; 

export const selectPopularArticle = state => state.articles.popularArticles;
export const selectTrendingArticle = state => state.articles.trendingArticles;
export const selectSportArticle = state => state.articles.sportArticles;
export const selectnewsArticle = state => state.articles.newsArticles;

// export const selectPopularArticleWithThumbnails = state => state.articles.articlesWithThumbnails;
// export const selectPopularArticleWithoutThumbnails = state => state.articles.articlesWithoutThumbnails;

export const selectDataIsLoading = state => state.articles.dataLoading;

export const selectPopularArticleIsLoading = state => state.articles.fetchPopularIsLoading; 
export const selectTrendingArticleIsLoading = state => state.articles.fetchTrendingIsLoading;
export const selectSportArticleIsLoading = state => state.articles.fetchSportIsLoading; 
export const selectNewsArticleIsLoading = state => state.articles.fetchNewsgIsLoading;

export default articleSlice.reducer; 