import React from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';

const SideNav = () => {
  const sideNavState = useSelector(selectShowSideNav)
  // console.log(sideNavState.sideNavHidden); 
  // const dispatch = useDispatch();

  return (
    <div>
      <div className={sideNavState.toggleSideNav ? "Header_show-side-nav" : "Header_side-nav"}>
        <form>
          <label>Search: </label>
          <input type="text" placeholder="Search term here..." />
          <label>Filter: </label>
          <select id="filters" name="filters">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>

          <div className="Header_side-nav-btn-container">
          <button className="Header_side-nav-btn" onClick={showSideNav}>Confirm</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default SideNav;