import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom';

import { selectInitialState, specificsFilterClicked, sortFilteredArray } from '../features/articleSlice';

const SpecificsFilters = () => {
  const dispatch = useDispatch(); 
  const location = useLocation(); 
  const [filterInput, setFilterInput] = useState([]); 

  const initialState = useSelector(selectInitialState);
  const popularArticles = initialState.articles.popularArticles;
  const newsArticles = initialState.articles.newsArticles;
  const sportArticles = initialState.articles.sportArticles;
  const savedArticles = initialState.articles.savedArticles;
  const allArticles = initialState.articles.allArticles;
  const path = location.pathname; 

  // console.log(path);

  // const filters = [['Score', '(High to Low)'], ['Score', '(Low to High)'], ['Posted', '(Most Recent to Oldest)'], ['Posted', '(Oldest to Most Recent)'], ['No. of Comments', '(High to Low)'], ['No. of Comments', '(Low to High)']];
  
  const filters = initialState.articles.specificsFilters;

  const handleClick = (e) => {
    // let filterOn;
    // e.target.checked ? filterOn = true : filterOn = false;

    dispatch(specificsFilterClicked({ filter: e.target.value, path })); 
  }

  const specificsFilterChecked = initialState.articles.specificsFilterChecked; 

  let keyCount = -1;

  return ( 
    filters.map(filter => {
      return (
        <div className="sideNav_filters-container" key={keyCount++}>
          <input type="checkbox" className={filter.checked ? "sideNav_filters-checkbox-checked" : "sideNav_filters-checkbox"} name="specifics" value={`${filter.filter} ${filter.order}`} onClick={handleClick} />
          <label><span className="sideNav_specifics-filter-title">{filter.filter}</span> <span className="sideNav_specifics-filter-brackets">{filter.order}</span></label>
        </div>
      )
    })
  )
}

export default SpecificsFilters;
