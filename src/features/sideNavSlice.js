import { createSlice } from '@reduxjs/toolkit'; 
// import { current } from '@reduxjs/toolkit';

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
      // console.log(`toggleSideNav dispatched. toggleNav currently = ${state.toggleSideNav}`)
      // console.log('dispatch triggered'); 
      state.toggleSideNav = !state.toggleSideNav; 
      // console.log(`toggleNav now = ${state.toggleSideNav}`)
    },
    eyeClicked: (state, action) => {
      state.eyeClicked = true;
    },
    resetEyeClicked: (state, action) => {
      state.eyeClicked = false;
    },
  }
});

export const { showSideNav, eyeClicked, resetEyeClicked } = sideNavSlice.actions; 

export const selectShowSideNav = state => state.sideNav;
export default sideNavSlice.reducer; 