import App from './App';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { shallow } from 'enzyme';  // creates an instance of your component

// import { mount } from 'enzyme';
// Shallow wrapping doesn’t descend down to sub-components. A full mount also mounts sub-components. We use just shallow here

import { findByTestAttr } from '../../utilities/test-utils'; 

// REFACTORING FUNCTIONS TO PREVENT REPETITIVE CODE ---- 

// any kept in here and not in utilities folder is because they are likely to change slightly from file to file, but will be used repetitively within that file so best to write individually

// Creates a shallow render wrap for the <App /> component 
const shallowRender = (props={}) => {
  const appWrapper = shallow(<App {...props} />); 
  return appWrapper; 
}


// describe creates a test suite 
describe('App Component', () => {

  // Prevents us having to declare shallow render variable in each test by invoking the shallowRender before each test
  let appWrapper;
  beforeEach(() => {
    appWrapper = shallowRender();
  }); 

  describe('Rendering of elements', () => {

    // it('App component renders', () => {
    //   // console.log(appWrapper.debug());
    //   expect(appWrapper).toBeDefined();
    // });

    it('App component renders', () => {
      // console.log(appWrapper.debug());
      expect(appWrapper).toHaveLength(1);
    }); 
  
  
    // -------------------------------------------------------
    // .find('element/component').toHaveLength(num of times expected to appear)    ---->  IS BEST PRACTICE FOR TESTING RENDERING OF ELEMENTS/COMPONENTS. 
    // -------------------------------------------------------
    

    // VALID
    it('renders one <Header /> component', () => {
      // console.log(appWrapper.debug());
      expect(appWrapper.find('Header')).toHaveLength(1);
    });  // components with capital, elements with lower case
  
    // VALID
    it('renders one <div> component', () => {
      // console.log(appWrapper.debug());
      // expect(appWrapper.find('div').length).toBe(1);
      expect(appWrapper.find('div')).toHaveLength(1);
      // either one of above works 
    });
  
    it('renders in all elements', () => {
      expect(appWrapper.containsMatchingElement(
        <div>
          <Header />
          <Footer />
        </div>
      )).toBeTruthy();
    }); // can test single or multiple elements, but if multiple, anything inside the most outer tags you're looking for has to match EXACTLY as it is in file (except attributes). E.g. if the <Header /> wasn't included in this test set up and it was just searching for <div></div>, it would fail. 


    // USING DATASETS OVER CLASSES WARNS OTHER DEVELOPERS TO NOT CHANGE THEM AS THEY ARE USED FOR TESTING PURPOSES. IF PART OF A TEST, CHANGE FROM CLASS TO DATA-SET. 

    // found by className
    // it('has a div with a class of "App"', () => {
    //   const app = appWrapper.find('.App'); 
    //   expect(app.length).toBe(1);
    // });

    // found by data-set
    it('has a div with a data-test of "App"', () => {
      // const div = appWrapper.find(`[data-test='App']`);

      // the above code refactored...
      const div = findByTestAttr(appWrapper, 'App')
      expect(div.length).toBe(1);  
    });
  });
});