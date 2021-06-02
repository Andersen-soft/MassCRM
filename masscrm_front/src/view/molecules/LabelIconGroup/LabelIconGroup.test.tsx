import * as React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { PermIdentity } from '@material-ui/icons';
import { LabelIconGroup } from './index';

describe('LabelIconGroup', () => {
  it('LabelIconGroup should render correctly', () => {
    expect(
      shallowToJson(
        shallow(<LabelIconGroup count='0' label='test' icon={PermIdentity} />)
      )
    ).toMatchSnapshot();
  });
});
