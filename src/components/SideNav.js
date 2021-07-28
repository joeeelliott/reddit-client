import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';

const SideNav = () => {
  const sideNavState = useSelector(selectShowSideNav)
  // console.log(sideNavState.sideNavHidden); 
  // const dispatch = useDispatch();

  return (
    <div>
      <div className={sideNavState.toggleSideNav ? "SideNav_show-nav" : "SideNav_hide-nav"}>
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

          <FontAwesomeIcon icon="filter" data-test-Header_filter-icon data-test-Header_font-awesome-icon aria-hidden="true" />

          <div className="SideNav_btn-container">
          <button className="SideNav_btn" onClick={showSideNav}>Confirm</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default SideNav;