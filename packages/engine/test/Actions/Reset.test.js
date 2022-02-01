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

import testContext from '../testContext.js';

const pageId = 'one';
const lowdefy = { pageId };

test('Reset one field', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'textInput',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'Reset' }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
    initState: { textInput: 'init' },
  });
  expect(context.state).toEqual({ textInput: 'init' });
  const { button, textInput } = context.RootBlocks.map;

  textInput.setValue('1');
  expect(context.state).toEqual({ textInput: '1' });
  button.triggerEvent({ name: 'onClick' });
  expect(context.state).toEqual({ textInput: 'init' });
});

test('Reset on primitive array after adding item', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'list',
            type: 'List',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    blockId: 'list.$',
                    type: 'TextInput',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
            },
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'Reset' }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
    initState: { list: ['init'] },
  });
  expect(context.state).toEqual({ list: ['init'] });
  const { button, list } = context.RootBlocks.map;

  list.pushItem();
  expect(context.state).toEqual({ list: ['init', null] });
  button.triggerEvent({ name: 'onClick' });
  expect(context.state).toEqual({ list: ['init'] });
});

test('Reset on object array after removing item', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'list',
            type: 'List',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    blockId: 'list.$.textInput',
                    type: 'TextInput',
                    defaultValue: '123',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
            },
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'Reset' }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
    initState: { list: [{ textInput: 'init' }] },
  });

  const { button, list } = context.RootBlocks.map;

  expect(context.state).toEqual({ list: [{ textInput: 'init' }] });
  list.removeItem(0);
  expect(context.state).toEqual({ list: [] });
  button.triggerEvent({ name: 'onClick' });
  expect(context.state).toEqual({ list: [{ textInput: 'init' }] });
});
