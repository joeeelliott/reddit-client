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
    });
    component = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });


  it('should render with given state from Redux store', () => {
    // component = renderer.create(
    //   <Provider store={store}>
    //     <Header />
    //   </Provider>
    // );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render one SideNav component', () => {
    expect(component.find('SideNav')).toHaveLength(1);
  });
});