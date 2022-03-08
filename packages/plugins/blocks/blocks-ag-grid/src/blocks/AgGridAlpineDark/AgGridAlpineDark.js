/*
  Copyright 2021 Lowdefy, Inc

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
import { blockDefaultProps } from '@lowdefy/block-tools';

import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';

import AgGrid from '../../AgGrid.js';

const AgGridAlpineDark = ({ blockId, events, methods, properties }) => (
  <div
    id={blockId}
    className={`ag-theme-alpine-dark ${methods.makeCssClass({
      width: '100%',
      height: properties.height || 500,
      ...properties.style,
    })}`}
  >
    <AgGrid events={events} properties={properties} methods={methods} />
  </div>
);

AgGridAlpineDark.defaultProps = blockDefaultProps;

AgGridAlpineDark.meta = {
  category: 'display',
  loading: false,
  icons: [],
  styles: [],
};

export default AgGridAlpineDark;
