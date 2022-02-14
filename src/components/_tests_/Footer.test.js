import { render, cleanup, screen } from '@testing-library/react'; 
import renderer from 'react-test-renderer'; // for snapshots
import Footer from '../Footer';

describe('Footer Component', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<Footer></Footer>);
    // screen.debug()
  });

  it('renders h1 correctly', () => {
    const { getByTestId } = render(<Footer></Footer>)
    expect(getByTestId('footer')).toHaveTextContent('Joe Elliott');
    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('matches snapshot', () => {
    // this is saved as an object called tree
    const tree = renderer.create(<Footer></Footer>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});