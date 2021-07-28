// import React from 'react';
// import { Provider } from 'react-redux';
// import {render, fireEvent, cleanup, waitForElement, within } from '@testing-library/react'; 
// import 'jest-dom/extend-expect';
// import { selectShowSideNav, showSideNav } from '../../features/sideNavSlice';

// import Header from '../Header';
// import store from '../../app/store2';

// afterEach(cleanup); 

// const renderComponent = () => render(
//   <Provider store={store()}>
//     <Header />
//   </Provider>
// );

// describe('Header Component tests', () => {
//   it('should render a SideNav component', () => {
//     expect(renderComponent().find('SideNav')).toHaveLength(1); 
//   })
// })

// import 'jest-dom/extend-expect';
import React from 'react'
// import { createStore } from 'redux';
import { connect } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react'; 

import Header from '../Header';
import store from '../../app/store2';
import { renderWithRedux } from '../../../utilities/test-utils';

afterEach(cleanup)

const ConnectedCounter = connect(state => ({toggleSideNav: state.toggleSideNav}))(Header)

test('can render with redux with defaults', () => {
  const { getByTestId, getByText, unmount, container } = renderWithRedux(
    <ConnectedCounter />,
    {
      initialState: {toggleSideNav: false},
    },
  )
  fireEvent.click(getByTestId('data-test-Header_bars-icon'))
  expect(toggleSideNav).toBe(true); 
})