import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux'; 
import { selectShowSideNav, showSideNav } from '../features/sideNavSlice';

const SideNav = () => {
  const sideNavState = useSelector(selectShowSideNav)
  // console.log(sideNavState.sideNavHidden); 
  // const dispatch = useDispatch();

  return (
    // <div role="sideNav-outer-div">
      <div data-testid="sideNav" className={sideNavState.toggleSideNav ? "sideNav_show-nav" : "sideNav_hide-nav"}>
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

          <FontAwesomeIcon data-testid="filter-icon" icon="filter" data-test-header_filter-icon data-test-header_font-awesome-icon aria-hidden="true" />

          <div className="sideNav_btn-container">
          <button className="sideNav_btn" >Confirm</button>
          {/* onClick={showSideNav} */}
        </div>
        </form>
      </div>
    // </div>
  )
}

export default SideNav;