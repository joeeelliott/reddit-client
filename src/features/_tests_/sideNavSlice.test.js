import reducer, { showSideNav } from '../sideNavSlice';

import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit'; 

// Reducers are pure functions that return the new state after applying the action to the previous state. In the majority of cases, the reducer is an implementation detail that does not need explicit tests. However, if your reducer contains particularly complex logic that you would like the confidence of having unit tests for, reducers can be easily tested.

// Because reducers are pure functions, testing them should be straightforward. Call the reducer with a specific input state and action, and assert that the result state matches expectations.

const initialState = {
  toggleSideNav: false,
  sideNavIconClicked: false,
  sideNavHidden: true,
};

describe('sideNavSlice tests', () => {
  describe('state and reducers', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('test toggleSideNav works properly', () => {
      const previousState = initialState;
      expect(reducer(previousState, showSideNav())).toEqual(
        {
          toggleSideNav: true,
          sideNavIconClicked: false,
          sideNavHidden: true,
        }
      )
    });
  });

  const emptyState = Immutable({
    toggleSideNav: false,
    sideNavIconClicked: false,
    sideNavHidden: true,
  });
  
  describe('selectors', () => {
  });
});