import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Logo } from './Logo';

describe('Logo', () => {
  it('Logo should render correctly', () => {
    expect(shallowToJson(shallow(<Logo />))).toMatchSnapshot();
  });
});
