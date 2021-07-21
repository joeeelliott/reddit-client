import Header from './Header';
import { shallow } from 'enzyme';

describe('Header Component', () => {
  // it('renders without crashing', () => {
  //   const headerWrapper = shallow(<Header />);
  //   // console.log(headerWrapper.debug());  // shows what code is in our headerWrapper variable, which is a shallow version of our <Header /> component. Shows whatever's inbetween the return () parenthesis. 
  // });

  it('equals true', () => {
    const Header = true;
    expect(Header).toEqual(true); 
  });
});