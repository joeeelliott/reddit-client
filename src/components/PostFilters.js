import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom';

import { postsFilterClicked, specificsFilterClicked, selectSpecificsFilter, selectPostFiltersArr } from '../features/postSlice';

const PostFilters = () => {
  const dispatch = useDispatch(); 
  const location = useLocation(); 

  const specificsFilter = useSelector(selectSpecificsFilter);
  const filters = useSelector(selectPostFiltersArr) || [];  // empty array for test purposes to prevent filters being undefined

  const path = location.pathname; 

  let keyCount = -1;

  const handleClick = (e) => {
    dispatch(postsFilterClicked({ filter: e.target.value }));
    if(specificsFilter){
      dispatch(specificsFilterClicked({ filter: undefined, path }));
    } // if a specificFilter is checked and we change postFilter, we reset all specificFilter 
  }

  return ( 
    filters.map(filter => {
      return (
        <div className="sideNav_filters-container" key={keyCount++}>
          <input type="checkbox" className={filter.checked ? "sideNav_filters-checkbox-checked" : "sideNav_filters-checkbox"} name={filter.filter.toLowerCase()} value={filter.filter} onClick={handleClick} />
          <label className={`${filter.filter.toLowerCase()}-label`}>{filter.filter} ({filter.posts})</label>
        </div>
      )
    })
  )
}

export default PostFilters;