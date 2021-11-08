import React from 'react';

const Title = ({ title }) => {
  return (
    <div className="article_title-container">
      <h1 className="article_title">{title}</h1>
    </div>
  )
}

export default Title;