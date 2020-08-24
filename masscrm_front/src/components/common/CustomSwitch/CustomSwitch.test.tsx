import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CustomSwitch } from './CustomSwitch';

describe('CustomSwitch', () => {
  const mockCallBack = jest.fn();

  const switchBtn = shallow(
    <CustomSwitch onChangeHandler={mockCallBack} value />
  );

  it('CustomSwitch should render correctly', () => {
    expect(shallowToJson(switchBtn)).toMatchSnapshot();
  });
});
