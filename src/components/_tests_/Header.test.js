import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import Header from '../Header'; 

import sideNavSlice from '../../features/sideNavSlice';
import { configureStore } from "@reduxjs/toolkit";

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = configureStore({
      reducer: {sideNav: sideNavSlice,}
    })
  });


  it('should render with given state from Redux store', () => {
    component = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  // received the following error for the above test 
  //  FAIL  src/components/_tests_/Header.test.js
  // ● Test suite failed to run
  // TypeError: Cannot read property 'getState' of undefined
});