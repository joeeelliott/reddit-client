import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom';

import { selectInitialState, postsFilterClicked, specificsFilterClicked } from '../features/postSlice';

const PostFilters = () => {
  const dispatch = useDispatch(); 
  const location = useLocation(); 

  const initialState = useSelector(selectInitialState);
  const specificsFilter = initialState.posts.specificFilter;
  const filters = initialState.posts.postFiltersArr; 
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
          <input type="checkbox" className={filter.checked ? "sideNav_filters-checkbox-checked" : "sideNav_filters-checkbox"} name={filter.filter} value={filter.filter} onClick={handleClick} />
          <label>{filter.filter} ({filter.posts})</label>
        </div>
      )
    })
  )
}

export default PostFilters;