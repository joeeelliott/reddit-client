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

  describe('renders in correct elements', () => {
    it('should render in one outer div', () => {
      expect(component.getAllByRole('outer-div')).toHaveLength(1);
    });

    it('should render in one comments div', () => {
      expect(component.getAllByRole('left-sided-column')).toHaveLength(1);
    });

    // dont yet have a test for the render of amount of actual articles - cos dont know how many there will be yet until i do the fetch request

    it('should render in one comments total <p> tag', () => {
      expect(component.getAllByRole('comments-total')).toHaveLength(1);
    });

    it('should render in one main-content <div>', () => {
      expect(component.getAllByRole('main-content-div')).toHaveLength(1);
    });

    it('should render in one title element', () => {
      expect(component.getAllByRole('title')).toHaveLength(1);
    });

    it('should render in one article <div>', () => {
      expect(component.getAllByRole('article')).toHaveLength(1);
    });

    it('should render in one article-details <div>', () => {
      expect(component.getAllByRole('article-details-div')).toHaveLength(1);
    });

    it('should render in three article details <p> tags', () => {
      expect(component.getAllByRole('article-detail')).toHaveLength(3);
    });

  });

});