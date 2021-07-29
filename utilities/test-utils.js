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