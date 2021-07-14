import React from 'react';

// import { useSelector } from 'react-redux'; 
// import { selectShowSideNav } from '../features/sideNavSlice';

const showSideNav = (e) => {
  console.log(e.currentTarget.classList); 
  console.log(e.target.classList); 
  e.currentTarget.classList.toggle("Header_show-nav-bar");
}


const SideNav = () => {
  // const sideNavHidden = useSelector(selectShowSideNav)

  return (
    <div>
      <div className="Header_side-nav">
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
        </form>

        <div className="Header_side-nav-btn-container">
          <button className="Header_side-nav-btn" onClick={showSideNav}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default SideNav;