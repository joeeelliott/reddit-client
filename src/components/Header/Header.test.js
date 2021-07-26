import Header from './Header';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../utilities/index'; 
import SideNav from '../SideNav'; 

// created an imported to be able to use with react-redux as enzyme doesnt work with hooks. 
import { ShallowMock } from '../../_mocks_/shallow-mock'; 

// imported to use in ShallowMock function 
import { store } from '../../app/store'; 

// const shallowRender = (props={}) => {
//   const component = shallow(<Header {...props} />); 
//   return component; 
// }

describe('Header Component', () => {

  // let component;
  // beforeEach(() => {
  //   component = ShallowMock(<Header />, store);
  // }); 

  it('should create the Header component', () => {
    const header = shallow(
      ShallowMock(<Header />, store)
    );
    expect(header).toBeTruthy(); 
  })


  // it('is defined', () => {
  //   // console.log(component.debug()); // this doesnt work 
  //   expect(component).toBeDefined();
  // });

  // it('to be truthy', () => {
  //   // console.log(component.debug()); // this doesnt work 
  //   expect(component).toBeTruthy();
  // });

  // it('renders one <SideNav /> component', () => {
  //   expect(component.find('SideNav'))
  // });
});

/// think i need to re look at my component variable bcos component.find() says its not a function as does component.debug() so component may not be defined correctly. 