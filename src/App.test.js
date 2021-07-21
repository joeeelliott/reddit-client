import App from './App';
import Header from './components/Header/Header';
import SideNav from './components/SideNav';

import { shallow } from 'enzyme';  // creates an instance of your component

// import { mount } from 'enzyme';
// Shallow wrapping doesn’t descend down to sub-components. A full mount also mounts sub-components. We use just shallow here

import { findByTestAttr } from '../Utilities/index'; 

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

  it('renders without errors', () => {
    // console.log(appWrapper.debug());  // logs what code is in appWrapper variable (shallow render of component) Shows whatever's inbetween the return () parenthesis. 

    expect(appWrapper).toHaveLength(1);  // think this creates an array of how many elements or React components are inside the return () of the App component. 1 passes but 2 does not so I imagine it might be Components. - not sure though
  });

  it('renders in a Header Component', () => {
    // .find() will find an instance of anything within the appWrapper, from Components right through to attributes.

    // const header = appWrapper.find(<Header />);  
    // expect(appWrapper).find(<Header />);    // this line doesn't work, looks like the best one to prove render of element is containsMatchingElement used below. 
  });

  it('renders in a Header Component', () => {
    expect(appWrapper.containsMatchingElement(
        <Header /> 
    )).toBeTruthy();
  });
  // only passes with a single element, can't include several elements

  it('renders in all elements', () => {
    expect(appWrapper.containsMatchingElement(
      <div>
        <Header />
      </div>
    )).toBeTruthy();
  }); // content inside the element tags you're testing has to be exactly as it is in file BUT doesnt have to have same attributes className etc. 


  // BELOW IS VALID AND PASSES FINE, BUT CLASSNAMES NOT BEST PRACTICE INCASE OTHER DEVELOPERS CHANGE THEM. SO CHANGE THE CLASSNAME TO A DATA-SET WHICH WILL WARN OTHER DEVELOPERS NOT TO CHANGE THESE AS THEY ARE PART OF A TEST. IF PART OF A TEST, CHANGE TO DATA-SET. 
  // it('has a div with a class of "App"', () => {
  //   const app = appWrapper.find('.App'); // found by className
  //   expect(app.length).toBe(1); // testing length to 1 makes sure it exists, if more than 1, put more.  
  // });

  // DATA-SETS WRITTEN DIFFERENT WHEN FINDING THEM, THE REST OF THE CODE THE SAME. 
  it('has a div with a data-test of "App"', () => {
    // const div = appWrapper.find(`[data-test='App']`); // found by className

    // the refactored function below removes requirement for above code 
    const div = findByTestAttr(appWrapper, 'App')
    expect(div.length).toBe(1); // testing length to 1 makes sure it exists, if more than 1, put more.  
  });
});