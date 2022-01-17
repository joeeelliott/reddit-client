import React from 'react';

import { convertUnixTimeStamp } from '../utils';

const TopRow = ({ author, created, permalink, id }) => {

  const handleClick = (e) => {
    const modals = document.getElementsByClassName("post_link-modal-container-hidden");

    for(const modal of modals){
      if(id === modal.parentNode.parentNode.parentNode.id){
        const correctModal = modal; // this gives us access to our specific required modal 
        correctModal.classList.add("post_link-modal-container");
        correctModal.classList.remove("post_link-modal-container-hidden");
        break;  // prevents the loop going any further once we've found the correct modal

        // we require the correct modal, so that when we activate the <a> tag, the correct permalink is used for that specific post. Before this, only the permalink of the first post on the page was being used for each post's link. 
      }
    }
  }

  const handleBtnClick = (e) => {
    const modals = document.getElementsByClassName("post_link-modal-container");
  
    // for of loop lets us iterate through a htmlcollection, which prevents us having to use [0]. As there will only ever be one modal open, we simply add and remove classes for that one modal
    for(const modal of modals){
      modal.classList.add("post_link-modal-container-hidden");
      modal.classList.remove("post_link-modal-container");
    }
  }

  return (
    <div className="post_details-top-container">
      <div className="post_post-details">
        <p className="post_api-data">Posted by <span className="strong">{author}</span></p>
        <p className="post_api-data">{convertUnixTimeStamp(created)}</p>
      </div>
      <div className="post_link-btn" onClick={handleClick}>
        {/* <a href={permalink} target="_blank" rel="noreferrer noopener" className="post_permalink"> */}
          <p className="post_link-btn-text"><strong>View post</strong></p>
        {/* </a> */}
      </div>

      <div className="post_link-modal-container-hidden">
        <div className="post_link-modal-content">
          <h1>You are now leaving this sample website</h1>
          <p>This link redirects you to the original post on the official Reddit website, which is not linked or related to this webpage in any way.</p>          
          <p>By clicking <strong>yes</strong> you will be redirected to the official Reddit website to see the full post. If you click <strong>no</strong>, you will remain on this sample Reddit website.</p>
          <p>Do you wish to continue?</p>
          <div className="post_link-modal-btn-container">
            <a href={permalink} target="_blank" rel="noreferrer noopener" className="post_permalink">
              <button onClick={handleBtnClick}>YES</button>
            </a>
            <button onClick={handleBtnClick}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopRow;