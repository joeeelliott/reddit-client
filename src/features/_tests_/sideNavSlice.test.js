import reducer, { showSideNav } from '../sideNavSlice';

const initialState = {
  toggleSideNav: false,
};

describe('sideNavSlice tests', () => {
  describe('state and reducers', () => {
    it('initialState is as expected', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('showSideNav reducer changes state as expected', () => {
      const previousState = initialState;
      expect(reducer(previousState, showSideNav())).toEqual(
        {
          toggleSideNav: true,
        }
      )
    });
  });
});