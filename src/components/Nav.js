import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const links = ["Popular", "Trending", "Sport", "News"];


  return (
    <div>
      <ul className="nav_list">
        {links.map(link => 
          <Link key={link} className="nav_link" to={() => {
            return link === 'Popular' ? '/' : `${link.charAt(0).toLowerCase()}${link.slice(1)}`;  // .slice(1) = from index 1 to end
          }}>
            <li>{link}</li>
          </Link>
        )}
      </ul>
    </div>
  )
}

export default Nav;