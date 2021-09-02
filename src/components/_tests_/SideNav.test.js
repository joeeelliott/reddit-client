import SideNav from '../SideNav'; 

import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { create } from 'react-test-renderer';

import { configureStore } from "@reduxjs/toolkit";

import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react'; 
import { store } from '../../app/store';

const render = component => rtlRender(
  <Provider store={store}>   
    {component}
  </Provider>
);

describe('SideNav Component', () => {

  let component;

  beforeEach(() => {
    component = render(<SideNav />)
  });

  describe('renders in correct content', () => {

    it('should render with given state from Redux store', () => {
      expect(screen).toMatchSnapshot();
    });

    it('renders an outer div element', () => {  // valid
      expect(component.getAllByRole('sideNav-outer-div')).toHaveLength(1);
    });

    it('renders in one <form> element', () => {
      expect(component.getAllByRole('form')).toHaveLength(1); 
    });

    it('renders in two <label> elements', () => {
      expect(component.getAllByRole('label')).toHaveLength(2); 
    });

    it('renders in one <input> element', () => {
      expect(component.getAllByRole('input')).toHaveLength(1); 
    });

    it('renders in one <select> element', () => {
      expect(component.getAllByRole('select')).toHaveLength(1); 
    });

    it('renders in four <option> elements', () => {
      expect(component.getAllByRole('option')).toHaveLength(4);
    });

    it('renders in one "filter" icon', () => {
      expect(component.getByTestId('filter-icon')).toBeInTheDocument(); 
    });

    it('renders in one button-container <div>', () => {
      expect(component.getAllByRole('btn-container')).toHaveLength(1);
    });

    it('renders in one button', () => {
      expect(component.getAllByRole('button')).toHaveLength(1); 
    })
  });

  

});