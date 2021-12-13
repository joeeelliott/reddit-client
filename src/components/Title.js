import React from 'react';

const Title = ({ title }) => {
  return (
    <div className="post_title-container">
      <h1 className="post_title">{title}</h1>
    </div>
  )
}

export default Title;