import React from 'react'; 
import '@testing-library/jest-dom/extend-expect';

// test-utils
import { render, cleanup } from '../../../utilities/test-utils';

import Post, { classNameIs } from '../Post';

describe('Post Component', () => {
  let component; 

  beforeEach(() => {
    const id = 'tdvvvy';
    const score = 44027;
    const author = "redwineandbeer";
    const created = 1647259288;
    const title = "Tulsi Gabbard labeled a \"Russian asset\" for pushing U.S. biolabs in Ukraine claim";
    const numComments = 4780;
    const saved = false;
    const thumbnail = {
      url: "https://www.newsweek.com/tulsi-gabbard-bio-labs-ukraine-russia-conspiracy-1687594",
      height: 140, 
      width: 140, 
    };
    const permalink = "https://www.reddit.com/r/politics/comments/tdvvvy/,tulsi_gabbard_labeled_a_russian_asset_for_pushing/";
    const postType = "popular";
    const scoredUp = false;
    const scoredDown = false;
    const hidden = false;
    const reported = false;
    const imgClicked = false;

    component = render(<Post id={id} score={score} author={author} created={created} title={title} numComments={numComments} saved={saved} thumbnail={thumbnail} permalink={permalink} postType={postType} scoredUp={scoredUp} scoredDown={scoredDown} hidden={hidden} reported={reported} imgClicked={imgClicked} />);
  });

  afterEach(cleanup);

  it('renders post without error', () => {
    const id = 'tdvvvy';
    const score = 44027;
    const author = "redwineandbeer";
    const created = 1647259288;
    const title = "Tulsi Gabbard labeled a \"Russian asset\" for pushing U.S. biolabs in Ukraine claim";
    const numComments = 4780;
    const saved = false;
    const thumbnail = {
      url: "https://www.newsweek.com/tulsi-gabbard-bio-labs-ukraine-russia-conspiracy-1687594",
      height: 140, 
      width: 140, 
    };
    const permalink = "https://www.reddit.com/r/politics/comments/tdvvvy/,tulsi_gabbard_labeled_a_russian_asset_for_pushing/";
    const postType = "popular";
    const scoredUp = false;
    const scoredDown = false;
    const hidden = false;
    const reported = false;
    const imgClicked = false;

    render(<Post id={id} score={score} author={author} created={created} title={title} numComments={numComments} saved={saved} thumbnail={thumbnail} permalink={permalink} postType={postType} scoredUp={scoredUp} scoredDown={scoredDown} hidden={hidden} reported={reported} imgClicked={imgClicked} />);
  });

  it('renders props correctly', async () => {
    const { findByText } = component; 
    const postTitle = await findByText("Tulsi Gabbard labeled a \"Russian asset\" for pushing U.S. biolabs in Ukraine claim");
    const postScore = await findByText('44.0k');
    const postAuthor = await findByText('redwineandbeer');

    expect(postTitle).toBeInTheDocument();
    expect(postScore).toBeInTheDocument();
    expect(postAuthor).toBeInTheDocument();

    // screen.debug();
  });

  it('sets the class of the post correctly', () => {
    // classNameIs(hidden, filterMode, filter, postType )

    // no post hidden, no filter clicked (sport tab open)
    const noHiddenNoFilter = classNameIs(false, false, '', 'sport');  // post_outer-container
    // no post hidden, any filter clicked
    const noHiddenFilterToAll = classNameIs(false, true, 'all', 'popular'); // post_outer-container
    // post hidden no filter (but sport tab clicked)
    const postHiddenNoFilter = classNameIs(true, false, '', 'sport');  // post_outer-container-hide
    // post hidden, filter clicked to hidden post's postType (news post hidden, then 'news' filter clicked)
    const postHiddenFilterToPostType = classNameIs(true, true, 'news', 'news');  // post_outer-container-hide
    // post hidden, filter clicked to 'all' 
    const postHiddenFilterToAll = classNameIs(true, true, 'all', 'news');  // post_outer-container-hide

    expect(noHiddenNoFilter).toBe('post_outer-container');
    expect(noHiddenFilterToAll).toBe('post_outer-container');
    expect(postHiddenNoFilter).toBe('post_outer-container-hide');
    expect(postHiddenFilterToPostType).toBe('post_outer-container-hide');
    expect(postHiddenFilterToAll).toBe('post_outer-container-hide');
  });
});