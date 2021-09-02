import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { create } from 'react-test-renderer';

import Header from '../Header'; 
import SideNav from '../SideNav';
import sideNavSlice from '../../features/sideNavSlice';

import { configureStore } from "@reduxjs/toolkit";

import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react'; 
import { store } from '../../app/store';


// @testing-library/react
const render = component => rtlRender(
  <Provider store={store}>   
    {component}
  </Provider>
);

describe('Header Component', () => {  

  // @testing-library/react
  let component;

  beforeEach(() => {
    component = render(<Header />)
  });

  // afterEach(cleanup);


  // ---------- TESTS WITH '@testing-library/react' -----------
  describe('renders in the correct elements', () => {
      // it('logs the component to the console', () => {
      // component.debug();      // logs whole component
      // component.debug(document.querySelector(''));  // logs a specific part of component
    // });

    it('should render with given state from Redux store', () => {
      expect(screen).toMatchSnapshot();
    });

    it('renders an outer div element', () => {  // valid
      expect(component.getAllByRole('outer-div')).toHaveLength(1);
    });

    it('renders two inner divs elements', () => {    // valid
      expect(component.getAllByRole('inner-div')).toHaveLength(2);
    });

    it('renders a "search" FontAwesome icon', () => {    // valid
      expect(component.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders a "reddit" FontAwesome icon', () => {    // valid
      expect(component.getByTestId('reddit-icon')).toBeInTheDocument();
    });

    it('renders in "Reddit" in the title', () => {    // valid
      expect(component.getByText('Reddit')).toBeInTheDocument();
    });

    it('renders in "Sample" in the title', () => {    // valid
      expect(component.getByText('Sample')).toBeInTheDocument();
    });

    // Can't find the Component by it's own means but the div with role 'sideNav-outer-div' exists within the SideNav component so as this test passes we know the SideNav is rendering in
    it('renders in the <SideNav /> component', () => {    // valid
      expect(component.getAllByRole('sideNav-outer-div')).toHaveLength(1);
    });
  }); 


  // The following SideNav tests are included in this file as the SideNav is animated on screen via the click of the search icon, which is part of the Header. As there is no search icon in the SideNav file, the tests fail in SideNav.test.js as the search icon is undefined when firing the click event.
  describe('side nav animates on screen as expected', () => {
    it('side nav is NOT visible on page load as it has className of "hide-nav"', async () => {

      const sideNav = await screen.findByRole('sideNav-outer-div');

      // this class ensures the SideNav is OFF screen (provided the class properties aren't changed)
      expect(sideNav).toHaveAttribute("class", "sideNav_hide-nav");   // valid
    });  // async await waits for page load

    it('side nav visible when search icon button is clicked', async () => {
      fireEvent.click(screen.getByTestId('search-icon'));     // SEARCH ICON BUTTON CLICKED FOR FIRST TIME

      const sideNav = await screen.findByRole('sideNav-outer-div');
      expect(sideNav).toBeVisible();  // valid
    });     // used async await here for the event to occur 

    it('side nav should be visible when search icon button is clicked - matches snapshot', () => {
      expect(component).toMatchSnapshot();
    });

    it('side nav has className of "show-nav" when search icon button is clicked once', async () => {
      // event is already fired in above test 

      // once we fire and event in any test, the virtual DOM stays in that state for the rest of the tests, so we don't need to fire the event again. Only fire event again if we need to fire that event (i.e. click that button) again for a second/third time etc. to test things for end user as if they clicked it again. 

      const sideNav = await screen.findByRole('sideNav-outer-div');

      expect(sideNav).toHaveClass("sideNav_show-nav");
    });

    it('side nav NOT visible when search icon button is clicked a second time as it has className of "hide-nav"', async () => {
      fireEvent.click(screen.getByTestId('search-icon'));         // SEARCH ICON BUTTON CLICKED FOR SECOND TIME

      const sideNav = await screen.findByRole('sideNav-outer-div');

      expect(sideNav).toHaveClass("sideNav_hide-nav");
    });

    it('side nav not visible when search icon button is clicked a second time - matches snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});

// describe('My Connected React-Redux Component', () => {
//   let mockStore;
//   let testRenderer;
//   let testInstance;

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {sideNav: sideNavSlice,}
//     });
//     testRenderer = renderer.create(
//       <Provider store={mockStore}>
//         <Header />
//       </Provider>
//     );
//     testInstance = testRenderer.root;
//   });

    // it('logs the component to the console', () => {
  //   console.log(testRenderer.toJSON());
  // });

  // it('should render with given state from Redux store', () => {
  //   expect(component.toJSON()).toMatchSnapshot();
  // });

//   it('should render one SideNav component', () => {
//     console.log(testRenderer.toJSON()); // this is how you console log with renderer
//     expect(testInstance.findByType(SideNav));
//     // expect(testInstance.find(SideNav)); // gives an error
//     // expect(testInstance.type(SideNav));  // gives an error
//   });

//   it('should render a div element', () => {
//     // console.log(testRenderer.toJSON()); // this is how you console log with renderer
//     expect(testInstance.findByType("div"))
//   });

//   it('should render a div with className "header_header"', () => {
//     const div = testInstance.getTestById('header_header');
//     expect(div).toBeTruthy(); 
//   });

// });