import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk( 
  'articles/loadArticles',
  async (arg, thunkAPI) => {
    try {
      // console.log('fetching data...')
      const response = await fetch(arg);

      const json = await response.json();
      // console.log(json.data.children)
      // console.log(json.data.children[0].data)

      return json.data.children;
    } catch (error) {
      console.log(error)
    }
  }
);

const articleSlice = createSlice({
  name: 'articles', 
  initialState: {
    articles: [],
    articlesWithThumbnails: [],
    articlesWithoutThumbnails: [],
    isLoading: true,
    hasError: false
  },
  reducers: {},
  extraReducers: {
    [fetchArticles.pending]: (state, action) => {
      console.log('fetchArticles.pending')
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      console.log('fetchArticles.fulfilled')
      state.isLoading = false;
      state.hasError = false;

      action.payload.forEach(article => {
        state.articles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments 
        });

        article.data.thumbnail && article.data.thumbnail.includes('https') ? state.articlesWithThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, thumbnail: article.data.thumbnail, thumbnailHeight: article.data.thumbnail_height, thumbnailWidth: article.data.thumbnail_width }) : state.articlesWithoutThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments });
      });

      // console.log(current(state))
      // console.log(action.payload)
      
    },
    [fetchArticles.rejected]: (state, action) => {
      console.log('fetchArticles.rejected')
      state.isLoading = false;
      state.hasError = true;
    }
  }
});

export const { } = articleSlice.actions;

export const initialState = state => state; 
export const selectArticle = state => state.articles.articles;
export const selectArticleWithThumbnails = state => state.articles.articlesWithThumbnails;
export const selectArticleWithoutThumbnails = state => state.articles.articlesWithoutThumbnails;
export const selectArticleIsLoading = state => state.articles.isLoading; 
export default articleSlice.reducer; 