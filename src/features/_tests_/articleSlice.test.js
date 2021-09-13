import reducer, { testFetchArticles, fetchArticles, selectArticle, initialState } from '../articleSlice';

// import reducer from '../articleSlice';

import { createAsyncThunk } from '@reduxjs/toolkit';

const mockInitialState = {
  articles: [],
  articlesWithThumbnails: [],
  articlesWithoutThumbnails: [],
  isLoading: true,
  hasError: false
}

// const testResult = testFetchArticles('https://www.reddit.com/r/popular.json?limit=10');



// fetch is a global method. In this instance we make it equivalent to a mock function.
global.fetch = jest.fn(() => {  // mock function: what does fetch return? 
  Promise.resolve({   // it returns a Promise we want to resolve 
    // the data the Promise resolves with contains json, which is a function which can be called 'something.json();' , and then that again returns a promise.
    json: () => Promise.resolve('pn7fst')  // within the data we get back from calling json (providing the promise is fulfilled) is 
  })
})

// describe('articleSlice tests', () => {
  it('initialState is as expected', () => {
    expect(reducer(undefined, {})).toEqual(mockInitialState);
  });

  it('fetch method works as expected', async () => {

    const result = await testFetchArticles();

    expect(result).toBe('pn7fst');
  });

  // it('state.article stores data correctly', () => {

  // });
  
// });