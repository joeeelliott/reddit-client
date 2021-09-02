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
      <div role="sideNav-outer-div" className={sideNavState.toggleSideNav ? "sideNav_show-nav" : "sideNav_hide-nav"}>
        <form role="form">
          <label role="label">Search: </label>
          <input role="input" type="text" placeholder="Search term here..." />
          <label role="label">Filter: </label>
          <select role="select" id="filters" name="filters">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>

          <FontAwesomeIcon data-testid="filter-icon" icon="filter" data-test-header_filter-icon data-test-header_font-awesome-icon aria-hidden="true" />

          <div role="btn-container" className="sideNav_btn-container">
          <button className="sideNav_btn" >Confirm</button>
          {/* onClick={showSideNav} */}
        </div>
        </form>
      </div>
    // </div>
  )
}

export default SideNav;