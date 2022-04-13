import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom';

import { specificsFilterClicked, selectSpecificFiltersArr } from '../features/postSlice';

const SpecificsFilters = () => {
  const dispatch = useDispatch(); 
  const location = useLocation(); 

  const filters = useSelector(selectSpecificFiltersArr) || [];  // empty array for test purposes to prevent filters being undefined
  const path = location.pathname; 
  
  const handleClick = (e) => {
    dispatch(specificsFilterClicked({ filter: e.target.value, path })); 
  }

  let keyCount = -1;  // unique id

  return ( 
    filters.map(filter => {
      return (
        <div className="sideNav_filters-container" key={keyCount++}>
          <input type="checkbox" className={filter.checked ? "sideNav_filters-checkbox-checked" : "sideNav_filters-checkbox"} name={`${filter.filter.toLowerCase()} ${filter.order.toLowerCase()}`} value={`${filter.filter} ${filter.order}`} onClick={handleClick} />
          <label><span className="sideNav_specifics-filter-title">{filter.filter}</span> <span className="sideNav_specifics-filter-brackets">{filter.order}</span></label>
        </div>
      )
    })
  )
}

export default SpecificsFilters;