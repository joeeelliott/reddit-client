import React from 'react';
import { render, cleanup, screen } from '../../../utilities/test-utils';

import PostFilters from '../PostFilters';

describe('PostFilters Component', () => {
  afterEach(cleanup); 

  it('renders without crashing', () => {   
    render(<PostFilters />); 
    // screen.debug()
  });

  // it('renders the filters', () => {  
  //   render(<PostFilters />, { state: {
  //     'posts': {
  //       allPosts: [],
  //       allPostsShown: true,
  //       dataLoading: false,
  //       ellipsisClicked: false,
  //       filterMode: false,
  //       hiddenPosts: [],
  //       imageClicked: false,
  //       isSearching: false,
  //       modalClosed: false,
  //       newsHasError: false,
  //       newsPosts: [],
  //       popularHasError: false,
  //       popularPosts: [],
  //       postFilter: "",
  //       postFiltersArr: [
  //         { filter: 'All', checked: false, posts: 0 },
  //         { filter: 'Popular', checked: false, posts: 0 },
  //         { filter: 'Sport', checked: false, posts: 0 },
  //         { filter: 'News', checked: false, posts: 0 },
  //         { filter: 'Saved', checked: false, posts: 0 },
  //         { filter: 'Hidden', checked: false, posts: 0 },
  //         { filter: 'Reported', checked: false, posts: 0 },
  //       ],
  //       reportModal: false,
  //       reportedPosts: [],
  //       savedPosts: [],
  //       searchText: "",
  //       searchedPosts: [],
  //       searchedPostsFound: false,
  //       specificFilter: "",
  //       specificsFiltersArr: [],
  //       specificsSortedArray: [],
  //       sportHasError: false,
  //       sportPosts: [],
  //     },
  //     'sideNav': {
  //       toggleSideNav: false
  //     }
  //   }});

  //   expect(screen.getByText('Popular')).toBeInTheDocument();
  //   // screen.debug();
  // });
});