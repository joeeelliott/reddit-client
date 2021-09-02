import Footer from '../Footer';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Footer Component', () => {

  let component; 
  beforeEach(() => {
    component = shallow(<Footer />)
  });

  it('renders one Footer component', () => {
    expect(component).toHaveLength(1);
  });

  it('renders one H1 element', () => {
    expect(component.find('h1')).toHaveLength(1); 
  });

  it('renders one p element', () => {
    expect(component.find('p')).toHaveLength(1); 
  });

  it('renders in the Footer component', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot(); 
  })
});