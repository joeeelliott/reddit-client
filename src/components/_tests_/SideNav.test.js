import React from 'react';
import { render, cleanup, screen } from '../../../utilities/test-utils';
import SideNav from '../SideNav'; 

describe('SideNav Component', () => {

  let component;
  beforeEach(() => {
    component = render(<SideNav />);
  });

  afterEach(cleanup); 

  it('renders without crashing', () => {   
    render(<SideNav />);
    // screen.debug(undefined, 300000)
  });

  it('renders sideNav search label', () => {
    const search = screen.getByLabelText('Search:');
    expect(search).toBeInTheDocument(); 
  });

  it('renders sideNav search placeholder', () => {
    const placeholder = component.getByPlaceholderText('Enter search term here...');
    expect(placeholder).toBeInTheDocument(); 
  });

  it('matches snapshot', () => {       
    expect(screen).toMatchSnapshot();
  });

  // can unit test my input fields/confirm button etc. here
});