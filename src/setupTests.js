// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// this is required to set up Enzyme in our files

// import Enzyme from 'enzyme';
import { configure } from 'enzyme'; 
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import registerFaIcons from './modules/@fortawesome/react-fontawesome';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Once installed, configure an instance of the adapter for the test runner 
Enzyme.configure({ adapter: new Adapter() });
configure({ adapter: new Adapter() });


registerFaIcons();