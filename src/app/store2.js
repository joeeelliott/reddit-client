// import { configureStore } from '@reduxjs/toolkit'; 

// import sideNavSlice from '../features/sideNavSlice'; 

// export const store = configureStore({
//   reducer: {
//     sideNav: sideNavSlice,
//   }
// });

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../features/sideNavSlice'; 

const store = state => createStore(reducer, state, applyMiddleware(thunk)); 

export default store; 