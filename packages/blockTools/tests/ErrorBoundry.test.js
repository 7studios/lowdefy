/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { ErrorBoundary } from '../src';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
  return <div>Error</div>; // eslint-disable-line
};

it('displays error message on error generated by child', () => {
  const wrapper = shallow(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
  expect(() => {
    wrapper.dive().html();
  }).toThrowError('Error thrown from problem child');
});