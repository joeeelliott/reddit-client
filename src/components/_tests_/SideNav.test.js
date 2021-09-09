import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react'; 

import SideNav from '../SideNav'; 
import { store } from '../../app/store';

const render = component => rtlRender(
  <Provider store={store}>   
    {component}
  </Provider>
);

describe('SideNav Component', () => {

  let component;
  beforeEach(() => {
    component = render(<SideNav />);
  });

  it('renders as expected; matches snapshot', () => {       
    expect(screen).toMatchSnapshot();
    expect(component).toMatchSnapshot();
  });

  // can unit test my input fields/confirm button etc. here
});