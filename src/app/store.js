import { configureStore } from '@reduxjs/toolkit'; 

import sideNavSlice from '../features/sideNavSlice'; 

export const store = configureStore({
  reducer: {
    sideNav: sideNavSlice,
  }
});