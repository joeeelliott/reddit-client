// THIS FILE IS FOR REFACTORED TEST FUNCTIONS THAT WILL BE KEPT IN A GLOBAL STATE AS THEY ARE LIKELY TO BE USED ACROSS MULTIPLE FILES

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper; 
}


// See https://redux.js.org/usage/writing-tests for more info on below code. May be useful at a later date when using integration testing API calls with fetch, msw etc. This is setup, other code on there for example of the integration test. 

import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
// import { Provider } from 'react-redux'
// Import your own reducer
import sideNavReducer from '../src/features/sideNavSlice';

// import 'jest-dom/extend-expect';
import React from 'react'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react'; 

import reducer from '../src/features/sideNavSlice'; 
import store from '../src/app/store2';

// this is a handy function that I normally make available 
// for all my tests that deal with connected components.
// you can provide initialState or the entire store that 
// the ui is rendered with
export function renderWithRedux(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>), 
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details). 
    store,
  }
}