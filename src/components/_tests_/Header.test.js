import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react'; 

import Header from '../Header'; 
import { store } from '../../app/store';


// @testing-library/react
const render = component => rtlRender(
  <Provider store={store}>   
    {component}
  </Provider>
);

describe('Header Component', () => {  
  let component;

  beforeEach(() => {
    component = render(<Header />)
  });

  // afterEach(cleanup);
  
  // it('logs the component to the console', () => {
  // component.debug();
  // })

  // it('logs specific part of component to the console', () => {
  // component.debug(document.querySelector(''));
  // })

  it('renders as expected; matches snapshot', () => {
    expect(screen).toMatchSnapshot();
    expect(component).toMatchSnapshot();
  });

  // SideNav snapshots included here as it requires the search icon to be clicked which is in the Header component, not the SideNav. 
  it('SideNav appears on screen as expected when search icon clicked', () => {
    fireEvent.click(component.getByTestId('search-icon'));

    expect(screen).toMatchSnapshot();
    expect(component).toMatchSnapshot();
  }); 

  it('SideNav appears off screen as expected when search icon clicked a second time', () => {
    fireEvent.click(component.getByTestId('search-icon'));

    expect(screen).toMatchSnapshot();
    expect(component).toMatchSnapshot();
  }); 
});