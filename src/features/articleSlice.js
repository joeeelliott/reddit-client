import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/loadArticles', 
  async () => {
    try {
      const response = await fetch('https://www.reddit.com/r/popular.json?limit=10');

      const json = await response.json();

      return json;
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
    isLoading: false,
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
      action.payload.data.children.forEach(article => {
        state.articles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, numComments: article.data.num_comments 
        })

        article.data.thumbnail && article.data.thumbnail.includes('https') ? state.articlesWithThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, numComments: article.data.num_comments, thumbnail: article.data.thumbnail, thumbnailHeight: article.data.thumbnail_height, thumbnailWidth: article.data.thumbnail_width }) : state.articlesWithoutThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, numComments: article.data.num_comments })
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

export const selectArticle = state => state;
export default articleSlice.reducer; 