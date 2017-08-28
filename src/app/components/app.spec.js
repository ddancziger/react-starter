import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App component', () => {
  it('contains welcome string', () => {
    const app = shallow(<App/>);
    expect(app.contains('Welcome to react starter!')).toBe(true);
  });
});
