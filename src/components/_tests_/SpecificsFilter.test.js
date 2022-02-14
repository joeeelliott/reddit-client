import React from 'react';
import { render, cleanup, screen, act } from '../../../utilities/test-utils';

import SpecificsFilters from '../SpecificsFilters';

describe('SpecificsFilters Component', () => {
  afterEach(cleanup); 

  it('renders without crashing', () => {   
    render(<SpecificsFilters />);
    // screen.debug();
  });
});