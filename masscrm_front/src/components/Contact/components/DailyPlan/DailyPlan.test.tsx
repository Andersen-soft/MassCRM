import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as ReactReduxHooks from 'react-redux';
import { DailyPlan } from '.';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('src/selectors');

jest.spyOn(ReactReduxHooks, 'useSelector').mockReturnValueOnce(30);

describe('DailyPlan', () => {
  it('DailyPlan should render correctly', () => {
    expect(shallowToJson(shallow(<DailyPlan />))).toMatchSnapshot();
  });
});
