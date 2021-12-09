import { createSlice } from '@reduxjs/toolkit'; 
import { current } from '@reduxjs/toolkit';

const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState: {
    toggleSideNav: false,
    sideNavIconClicked: false,
    sideNavHidden: true,
    eyeClicked: false,
  },
  reducers: {
    showSideNav: (state, action) => {
      state.toggleSideNav = !state.toggleSideNav; 
    },
  }
});

export const { showSideNav } = sideNavSlice.actions; 

export const selectShowSideNav = state => state.sideNav;
export default sideNavSlice.reducer; 