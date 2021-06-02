import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { SocialIcon } from './SocialIcon';

describe('SocialIcon', () => {
  const icon = shallow(<SocialIcon socialName='linkedin' />);

  it('SocialIcon should render correctly', () => {
    expect(shallowToJson(icon)).toMatchSnapshot();
  });
});
