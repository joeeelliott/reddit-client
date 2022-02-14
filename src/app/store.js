import { configureStore } from '@reduxjs/toolkit';

import sideNavReducer from '../features/sideNavSlice'; 
import postReducer from '../features/postSlice'; 

export const store = configureStore({
  reducer: {
    sideNav: sideNavReducer,
    posts: postReducer,
  }
});