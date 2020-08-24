import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ExitIcon } from './ExitIcon';

describe('ExitIcon', () => {
  const mockCallBack = jest.fn();

  const icon = shallow(<ExitIcon onClickHandler={mockCallBack} />);

  it('Logo should render correctly', () => {
    expect(shallowToJson(icon)).toMatchSnapshot();
  });

  icon.simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
