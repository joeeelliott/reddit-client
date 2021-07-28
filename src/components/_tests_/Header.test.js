import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Header from '../Header'; 

const mockStore = configureStore([]); 

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      toggleSideNav: false,
      sideNavIconClicked: false,
      sideNavHidden: true,
    });
  });

  component = renderer.create(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  // received the following error for the above test 
  //  FAIL  src/components/_tests_/Header.test.js
  // ● Test suite failed to run
  // TypeError: Cannot read property 'getState' of undefined
});