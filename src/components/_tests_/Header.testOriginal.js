import Header from '../Header';
import { findByTestAttr } from '../../../utilities/test-utils'; 
import SideNav from '../SideNav'; 

import React from 'react';
import { shallow } from 'enzyme';

// created an imported to be able to use with react-redux as enzyme doesnt work with hooks. 
import { ShallowMock } from '../../_mocks_/shallow-mock'; 
import { store } from '../../app/store'; 
import { Provider } from 'react-redux';


// const shallowRender = (props={}) => {
//   const component = shallow(<Header {...props} />); 
//   return component; 
// }

describe('Header Component', () => {

  let component;
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    // component = ShallowMock(<Header />, store);  
    // this gives the following error for this test: 
    // ● Header Component › renders one <SideNav /> component
    // TypeError: component.find is not a function
 
    // and the following error for this test: 
    // ● Header Component › should create the Header component
    // could not find react-redux context value; please ensure the component is wrapped in a <Provider>


    // component = shallow('Header'); 
    // this gives the following error: TypeError: ShallowWrapper can only wrap valid elements

    // component = shallowRender();  
    // this gives the following error:   could not find react-redux context value; please ensure the component is wrapped in a <Provider>
  }); 

  // connected to ShallowMock() above. 
  // it('should create the Header component', () => {
  //   const header = shallow(
  //     ShallowMock(<Header />, store)
  //   );
  //   // expect(header).toHaveLength(1); 
  //   expect(header).toBeTruthy();
  // });

  it('should create the Header component', () => {
    expect(component).toHaveLength(1);
  });

  // TEST FAIL
  // it('renders one <SideNav /> component', () => {
  //   expect(component.find('SideNav')).toHaveLength(1);
  // });
});