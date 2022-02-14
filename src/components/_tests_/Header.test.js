import React from 'react';

// local render()
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react';  
// import { store } from '../../app/store';

// test-utils
import { render, fireEvent, screen, cleanup } from '../../../utilities/test-utils';

// regular render 
// import { render, screen, fireEvent, cleanup } from '@testing-library/react'; 

// YouTube vid: https://www.youtube.com/watch?v=rRFNRhUbMag


import Header from '../Header';

// redux-mock-store
// import configureStore from 'redux-mock-store';
// const middlewares = []
// const mockStore = configureStore(middlewares)


// const render = component => rtlRender(
//   <Provider store={store}>  
//     <BrowserRouter>
//       {component}
//     </BrowserRouter>
//   </Provider>
// );


describe('Header Component', () => {  
  let component;

  beforeEach(() => {
    component = render(<Header />)
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<Header />);
    screen.debug(undefined, 300000);
  });

  it('title renders "Reddit"', () => {
    const { getByText } = component; 
    const title = getByText('Reddit');
    expect(title).toBeInTheDocument();
  });

  // it('renders as expected; matches snapshot', () => {
  //   expect(screen).toMatchSnapshot();
  //   expect(component).toMatchSnapshot();
  // });

  // // SideNav snapshots included here as it requires the search icon to be clicked which is in the Header component, not the SideNav. 
  // it('SideNav appears on screen as expected when search icon clicked', () => {
  //   fireEvent.click(component.getByTestId('search-icon'));

  //   expect(screen).toMatchSnapshot();
  //   expect(component).toMatchSnapshot();
  // }); 

  // it('SideNav appears off screen as expected when search icon clicked a second time', () => {
  //   fireEvent.click(component.getByTestId('search-icon'));

  //   expect(screen).toMatchSnapshot();
  //   expect(component).toMatchSnapshot();
  // }); 
});