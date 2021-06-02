import * as React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Gender } from './Gender';

describe('Gender', () => {
  const mockCallBack = jest.fn();

  const gender = shallow(<Gender onChangeHandler={mockCallBack} />);

  it('RadioFilter should render correctly', () => {
    expect(shallowToJson(gender)).toMatchSnapshot();
  });
});
