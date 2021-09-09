import React from 'react'; 
import { Provider } from 'react-redux';
import Article from '../Article'; 

import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react'; 
import { store } from '../../app/store';

const render = component => rtlRender(
  <Provider store={store}>   
    {component}
  </Provider>
);

describe('Article Component', () => {
  
  let component;

  beforeEach(() => {
    component = render(<Article />)
  });

  it('renders in as expected; matches snapshot', () => {
    expect(component).toMatchSnapshot(); 
  })

  // need to complete rendering of Reddit data into the UI before i can test for whether the data in the UI matches the data in the slice state. - i think these will be valid tests for this component. 

});