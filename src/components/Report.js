import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { reportPost, toggleReportModal } from '../features/postSlice';

const Report = ({ id, reported, postType }) => {
  const dispatch = useDispatch(); 
  
  const handleClick = (e) => {
    dispatch(reportPost({ id, postType }));   // toggle reported state of currentPost 

    // we only toggle modalClosed if the post is NOT reported already. If we toggle on each report click, we will be telling our store modalClosed = false when we click report a second time to make it unreported - which would not be true, and would prevent us being able to re-open the modal again as the states won't match the required conditions to render in ReportModal in Post.js
    if(!reported){     
      dispatch(toggleReportModal());  
    }
  }

  return (
    <button className={reported ? "post_report-container-clicked" : "post_report-container"} onClick={handleClick}>
      <div className="post_report-icon-container">
        <FontAwesomeIcon 
          aria-hidden="true"
          aria-label="Report this post"
          className="post_report-icon" 
          icon={['far', 'flag']} 
        />
      </div>

      <p className="post_report-text">{reported ? 'Reported' : 'Report'}</p>
    </button>
  )
}

export default Report;