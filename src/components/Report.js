import React from 'react';
import { useDispatch } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { reportArticle, toggleReportModal } from '../features/articleSlice';

const Report = ({ id, reported, articleType, articles }) => {
  const dispatch = useDispatch(); 
  
  const handleClick = (e) => {
    dispatch(reportArticle({ id, articleType }));   // toggle reported state of currentArticle 

    // we only toggle modalClosed if the article is NOT reported already. If we toggle on each report click, we will be telling our store modalClosed = false when we click report a second time to make it unreported - which would not be true, and would prevent us being able to re-open the modal again as the states won't match the required conditions to render in ReportModal in Article.js
    if(!reported){     
      dispatch(toggleReportModal());  
    }
  }

  return (
    <div className={reported ? "article_report-container-clicked" : "article_report-container"} onClick={handleClick}>
      <div className="article_report-icon-container">
        <FontAwesomeIcon className="article_report-icon" icon={['far', 'flag']} />
      </div>

      <p className="article_report-text">{reported ? 'Reported' : 'Report'}</p>

    </div>
  )
}

export default Report;