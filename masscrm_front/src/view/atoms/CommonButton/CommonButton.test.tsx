import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CommonButton } from './CommonButton';

describe('CommonButton', () => {
  const mockCallBack = jest.fn();

  const yellowBtn = shallow(
    <CommonButton
      onClickHandler={mockCallBack}
      color='yellow'
      size='small'
      text='test'
      disabled
    />
  );

  it('whiteBtn should render correctly', () => {
    expect(shallowToJson(yellowBtn)).toMatchSnapshot();
  });

  yellowBtn.simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
