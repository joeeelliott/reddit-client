import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

import { userNoSearch } from '../features/articleSlice'; 

const Nav = () => {
  const dispatch = useDispatch(); 
  const links = ["Popular", "Sport", "News", "Saved"];


  const handleClick = (e) => {
    dispatch(userNoSearch()); 
  }

  return (
    <div>
      <ul className="nav_list">
        {links.map(link => 
          <Link key={link} onClick={handleClick} className="nav_link" to={() => {
            return link === 'Popular' ? '/' : `${link.charAt(0).toLowerCase()}${link.slice(1)}`;  // .slice(1) = from index 1 to end
          }}>
            <li className="nav_link-text">{link}</li>
          </Link>
        )}
      </ul>
    </div>
  )
}

export default Nav;
