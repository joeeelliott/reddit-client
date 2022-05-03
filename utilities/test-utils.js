// THIS FILE IS FOR REFACTORED TEST FUNCTIONS THAT WILL BE KEPT IN A GLOBAL STATE AS THEY ARE LIKELY TO BE USED ACROSS MULTIPLE FILES

// See https://redux.js.org/usage/writing-tests for more info on below code. May be useful at a later date when using integration testing API calls with fetch, msw etc. This is setup, other code on there for example of the integration test. 

import React from 'react'; 
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
// Import your own reducer
import sideNavReducer from '../src/features/sideNavSlice';
import postReducer from '../src/features/postSlice'; 

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { sideNav: sideNavReducer, posts: postReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return ( 
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
//override render method
export { render }
