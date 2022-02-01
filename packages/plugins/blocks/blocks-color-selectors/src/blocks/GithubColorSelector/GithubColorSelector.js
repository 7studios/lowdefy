/*
  Copyright 2020-2021 Lowdefy, Inc

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
import { GithubPicker } from 'react-color';
import { blockDefaultProps } from '@lowdefy/block-utils';
import Label from '@lowdefy/blocks-antd/blocks/Label/Label.js';

const Selector = ({ blockId, loading, methods, properties, required, validation, value }) => {
  return (
    <Label
      blockId={blockId}
      loading={loading}
      methods={methods}
      properties={{ title: properties.title, size: properties.size, ...properties.label }}
      required={required}
      validation={validation}
      content={{
        content: () => (
          <GithubPicker
            id={`${blockId}_input`}
            className={methods.makeCssClass([
              { marginBottom: '0px !important' },
              properties.inputStyle,
            ])}
            color={value || properties.defaultColor || '#000000'}
            colors={properties.colors}
            triangle={properties.triangle || 'hide'}
            width={properties.width || '100%'}
            onChangeComplete={(color) => {
              methods.setValue(color.hex ? color.hex : '#000000');
              methods.triggerEvent({ name: 'onChange' });
            }}
          />
        ),
      }}
    />
  );
};

Selector.defaultProps = blockDefaultProps;
Selector.meta = {
  valueType: 'string',
  category: 'input',
  loading: {
    type: 'Skeleton',
    properties: {
      width: 216,
      height: 62,
    },
  },
  icons: [...Label.meta.icons],
  styles: ['blocks/GithubColorSelector/style.less'],
};

export default Selector;
