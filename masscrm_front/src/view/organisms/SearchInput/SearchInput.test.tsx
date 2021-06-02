import * as React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  const mockCallBack = jest.fn();

  const searchInput = shallow(
    <SearchInput
      onChange={mockCallBack}
      items={['A', 'B', 'C', 'D', 'E']}
      placeholder='test'
    />
  );

  it('NumericRangeFilter should render correctly', () => {
    expect(shallowToJson(searchInput)).toMatchSnapshot();
  });
});
