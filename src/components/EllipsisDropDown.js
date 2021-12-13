import React from 'react';

import Save from './Save';
import Hide from './Hide';
import Report from './Report';

const EllipsisDropDown = ({ id, saved, hidden, reported, postType }) => {
  return (
    <div className="post_ellipsis-dropdown">
      <Save id={id} saved={saved} postType={postType} />
      <Hide id={id} hidden={hidden} postType={postType} />
      <Report id={id} reported={reported} postType={postType} />
    </div>
  )
}

export default EllipsisDropDown;