import React from 'react';
// import { Provider } from 'react-redux';
// import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react'; 
// import { store } from '../../app/store';

import { render, cleanup, screen } from '../../../utilities/test-utils';

import SideNav from '../SideNav'; 

// const render = component => rtlRender(
//   <Provider store={store}>   
//     {component}
//   </Provider>
// );

describe('SideNav Component', () => {

  // let component;
  // beforeEach(() => {
  //   component = render(<SideNav />);
  // });

  afterEach(cleanup); 

  it('renders without crashing', () => {   
    render(<SideNav />);
    screen.debug(undefined, 300000)
  });

  // it('renders as expected; matches snapshot', () => {       
  //   expect(screen).toMatchSnapshot();
  //   expect(component).toMatchSnapshot();
  // });

  // can unit test my input fields/confirm button etc. here
});