import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Testing App', () => {
  it('renders without crashing', () => {
    require('mutationobserver-shim');
    shallow(<App />);
  })

});
