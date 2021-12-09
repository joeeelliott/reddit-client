import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom';

import { selectInitialState, postsFilterClicked, specificsFilterClicked } from '../features/articleSlice';
// import { postsFilterClicked } from '../features/sideNavSlice';

const PostFilters = () => {
  const dispatch = useDispatch(); 
  const location = useLocation(); 
  const [filterInput, setFilterInput] = useState([]); 

  const initialState = useSelector(selectInitialState);
  const popularArticles = initialState.articles.popularArticles;
  const newsArticles = initialState.articles.newsArticles;
  const sportArticles = initialState.articles.sportArticles;
  const savedArticles = initialState.articles.savedArticles;
  const allArticles = initialState.articles.allArticles;

  const specificsFilter = initialState.articles.filteredSpecifics;

  // const filters = ['All', 'Popular', 'News', 'Sport', 'Saved', 'Hidden', 'Reported']; 

  const filters = initialState.articles.postFilters; 
  // console.log(filters); 

  const path = location.pathname; 

  let keyCount = -1;

  const handleClick = (e) => {
    // console.log(e.target.checked);
    // console.log(e.target.value);

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