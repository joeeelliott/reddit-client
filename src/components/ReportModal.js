import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectInitialState, toggleReportModal } from '../features/articleSlice';

const ReportModal = ({ reported }) => {
  const dispatch = useDispatch(); 
  const initialState = useSelector(selectInitialState); 
  const modalClosed = initialState.articles.modalClosed;

  const handleClick = (e) => {
    e.preventDefault(); 
    dispatch(toggleReportModal()); 
  }

  return (
    <div className={reported && !modalClosed ? "article_report-modal" : "article_report-modal-hidden"}>
      <div className="article_report-modal-content">
        <div>
          <FontAwesomeIcon className="article_report-modal-report-icon" icon={['far', 'flag']} />
        </div>
        <h1>Post Reported</h1>
        <p>Reddit authorties have been informed and an investigation into the post will be opened. 
        </p>
        <p>In the meantime if you wish to hide this post from your timeline, click the hide button.</p>
        <div className="article_report-modal-btn-container">
          <button onClick={handleClick}>CLOSE</button>
        </div>
      </div>
    </div>
  )
}

export default ReportModal;