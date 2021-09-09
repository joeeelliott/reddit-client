import App from './App';

import { shallow } from 'enzyme';  // creates an instance of your component

// Creates a shallow render wrap for the <App /> component 
const shallowRender = (props={}) => {
  const wrapper = shallow(<App {...props} />); 
  return wrapper; 
}

// describe creates a test suite 
describe('App Component', () => {

  // Prevents us having to declare shallow render variable in each test by invoking the shallowRender before each test
  let component;

  beforeEach(() => {
    component = shallowRender();
  }); 

  it('renders as expected; matches snapshot', () => {
    expect(component).toMatchSnapshot(); 
  });
});
