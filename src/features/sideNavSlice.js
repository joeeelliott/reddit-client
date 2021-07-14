import { createSlice } from '@reduxjs/toolkit'; 

const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState: {
    sideNavIconClicked: false,
    sideNavHidden: true,
    // isThisworking: true,
  },
  reducers: {
    showSideNav: (state, action) => {
      console.log('working'); 
      // state.sideNavIconClicked = !sideNavIconClicked;
      // state.sideNavHidden = !sideNavHidden; 
    }
  }
});

export const { showSideNav } = sideNavSlice.actions; 

export const selectShowSideNav = state => state.sideNav;
export default sideNavSlice.reducer; 