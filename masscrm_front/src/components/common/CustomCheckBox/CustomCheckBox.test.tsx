import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CustomCheckBox } from './CustomCheckBox';

describe('CustomCheckBox', () => {
  const mockCallBack = jest.fn();

  const checkBox = shallow(<CustomCheckBox onChange={mockCallBack} />);

  it('checkBox should render correctly', () => {
    expect(shallowToJson(checkBox)).toMatchSnapshot();
  });
});
