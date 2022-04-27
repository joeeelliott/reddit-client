import React from 'react';
import { render, cleanup } from '../../../utilities/test-utils';

import PostFilters from '../PostFilters';

describe('PostFilters Component', () => {
  afterEach(cleanup); 

  it('renders without crashing', () => {   
    render(<PostFilters />); 
    // screen.debug()
  });
});