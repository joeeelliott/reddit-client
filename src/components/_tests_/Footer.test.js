import Footer from '../Footer';
import { shallow } from 'enzyme';

describe('Footer Component', () => {

  let component; 
  beforeEach(() => {
    component = shallow(<Footer />)
  });

  it('renders in as expected; matches snapshot', () => {
    expect(component).toMatchSnapshot(); 
  });
});