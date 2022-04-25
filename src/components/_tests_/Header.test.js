import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '../../../utilities/test-utils';

import Header from '../Header';

describe('Header Component', () => {  
  let component;

  beforeEach(() => {
    component = render(<Header />);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<Header />);
    // screen.debug(undefined, 300000);
  });

  it('title renders "Reddit"', () => {
    const { getByText } = component; 
    const title = getByText('Reddit');
    expect(title).toBeInTheDocument();
  });

  it('renders all Navigation tab text', () => {
    const { getByText } = component; 
    const popular = getByText('Popular');
    const sport = getByText('Sport');
    const news = getByText('News');
    expect(popular).toBeInTheDocument();
    expect(sport).toBeInTheDocument();
    expect(news).toBeInTheDocument();
  });

  it('renders searchBtn', () => {
    const { getByRole } = component; 
    const btn = getByRole('button', {name: 'Toggle the side navigation menu open and closed'});
    expect(btn).toBeInTheDocument();
  });

  it('renders as expected; matches snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});