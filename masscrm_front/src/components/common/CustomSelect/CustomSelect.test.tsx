import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CustomSelect } from './CustomSelect';

describe('CustomSelect', () => {
  const mockCallBack = jest.fn();

  const customSelect = shallow(
    <CustomSelect
      onChange={mockCallBack}
      items={['A', 'B', 'C', 'D', 'E']}
      placeholder='test'
      multi
    />
  );

  it('MultiSelectFilter should render correctly', () => {
    expect(shallowToJson(customSelect)).toMatchSnapshot();
  });
});
