import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation(); 
  
  return (
    <div className="footer">
      <h1>Joe Elliott</h1><p>&copy;</p>
    </div>
  )
}

export default Footer;