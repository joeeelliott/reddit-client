import { configureStore } from '@reduxjs/toolkit'; 

import sideNavSlice from '../features/sideNavSlice'; 
import articleSliceReducer from '../features/articleSlice'; 

export const store = configureStore({
  reducer: {
    sideNav: sideNavSlice,
    articles: articleSliceReducer,
  }
});