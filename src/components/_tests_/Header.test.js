import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import Header from '../Header'; 
import Footer from '../Footer'; 

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
        <Footer />
      </Provider>
    );
  });


  it('should render with given state from Redux store', () => {
    // component = renderer.create(
    //   <Provider store={store}>
    //     <Header />
    //     <Footer />
    //   </Provider>
    // );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render one Header component', () => {
    expect(component.find('Header')).toHaveLength(1);
  });
});