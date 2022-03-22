import React from 'react';
import { render, cleanup, screen } from '../../../utilities/test-utils';
import Footer from '../Footer';

describe('Footer Component', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<Footer />);
    // screen.debug()
  });

  it('renders h1 correctly', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('footer')).toHaveTextContent('Joe Elliott');
    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('matches snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});