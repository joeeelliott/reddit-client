import { configureStore } from '@reduxjs/toolkit'; 

import sideNavSlice from '../features/sideNavSlice'; 
import postSlice from '../features/postSlice'; 

export const store = configureStore({
  reducer: {
    sideNav: sideNavSlice,
    posts: postSlice,
  }
});