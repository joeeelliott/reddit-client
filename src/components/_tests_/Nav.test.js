import React from 'react';
import { render, cleanup, screen } from '../../../utilities/test-utils';

import Nav from '../Nav';

describe('Nav Component', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {   
    render(<Nav />);
    // screen.debug()
  });

  it('matches snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});