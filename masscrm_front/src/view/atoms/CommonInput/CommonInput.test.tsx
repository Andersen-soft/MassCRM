import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CommonInput } from './CommonInput';

describe('CommonButton', () => {
  const mockCallBack = jest.fn();

  const input = shallow(
    <CommonInput type='text' value='test' onChangeValue={mockCallBack} />
  );

  it('input should render correctly', () => {
    expect(shallowToJson(input)).toMatchSnapshot();
  });

  it('input should render error', () => {
    expect(shallowToJson(input.setProps({ isValid: false }))).toMatchSnapshot();
  });
});
