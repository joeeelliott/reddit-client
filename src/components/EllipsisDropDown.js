import React from 'react';

import Save from './Save';
import Hide from './Hide';
import Report from './Report';

const EllipsisDropDown = ({ id, saved, hidden, reported, articles, articleType }) => {
  return (
    <div className="article_ellipsis-dropdown">
      <Save id={id} saved={saved} articles={articles} articleType={articleType} />
      <Hide id={id} hidden={hidden} articles={articles} articleType={articleType} />
      <Report id={id} reported={reported} articles={articles} articleType={articleType} />
    </div>
  )
}

export default EllipsisDropDown;