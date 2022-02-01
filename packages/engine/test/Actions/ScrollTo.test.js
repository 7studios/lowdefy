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

// Mock document
const mockDocGetElementById = jest.fn();
const mockElemScrollIntoView = jest.fn();
const document = {
  getElementById: mockDocGetElementById,
};
const mockDocGetElementByIdImp = (id) => {
  if (id === 'root') return { id, scrollIntoView: mockElemScrollIntoView };
};

// Mock window
const mockWindowFocus = jest.fn();
const mockWindowOpen = jest.fn(() => ({ focus: mockWindowFocus }));
const mockWindowScrollTo = jest.fn();
const window = {
  location: { href: '', origin: 'http://lowdefy.com' },
  open: mockWindowOpen,
  scrollTo: mockWindowScrollTo,
};

const lowdefy = {
  _internal: {
    document,
    window,
  },
};

beforeEach(() => {
  mockWindowOpen.mockReset();
  mockWindowFocus.mockReset();
  mockWindowScrollTo.mockReset();
  mockDocGetElementById.mockReset();
  mockDocGetElementById.mockImplementation(mockDocGetElementByIdImp);
  mockElemScrollIntoView.mockReset();
});

test('ScrollTo with no params', async () => {
  const rootBlock = {
    id: 'block:root:root:0',
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            id: 'block:root:button:0',
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'ScrollTo' }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
  });
  const button = context._internal.RootBlocks.map['block:root:button:0'];
  button.triggerEvent({ name: 'onClick' });
  expect(mockWindowScrollTo.mock.calls).toEqual([[{}]]);
});

test('ScrollTo with no blockId', async () => {
  const rootBlock = {
    id: 'block:root:root:0',
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            id: 'block:root:button:0',
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'ScrollTo', params: { behavior: 'smooth', top: 0 } }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
  });
  const button = context._internal.RootBlocks.map['block:root:button:0'];
  button.triggerEvent({ name: 'onClick' });
  expect(mockWindowScrollTo.mock.calls).toEqual([
    [
      {
        behavior: 'smooth',
        top: 0,
      },
    ],
  ]);
});

test('ScrollTo with blockId', async () => {
  const rootBlock = {
    id: 'block:root:root:0',
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            id: 'block:root:button:0',
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'ScrollTo', params: { blockId: 'root' } }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
  });
  const button = context._internal.RootBlocks.map['block:root:button:0'];
  button.triggerEvent({ name: 'onClick' });
  expect(mockDocGetElementById.mock.calls).toEqual([['root']]);
  expect(mockElemScrollIntoView.mock.calls).toEqual([[undefined]]);
});

test('ScrollTo with blockId and options', async () => {
  const rootBlock = {
    id: 'block:root:root:0',
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            id: 'block:root:button:0',
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [
                {
                  id: 'a',
                  type: 'ScrollTo',
                  params: { blockId: 'root', options: { behavior: 'smooth' } },
                },
              ],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
  });
  const button = context._internal.RootBlocks.map['block:root:button:0'];
  button.triggerEvent({ name: 'onClick' });

  expect(mockDocGetElementById.mock.calls).toEqual([['root']]);
  expect(mockElemScrollIntoView.mock.calls).toEqual([
    [
      {
        behavior: 'smooth',
      },
    ],
  ]);
});

test('ScrollTo with blockId, block not found', async () => {
  const rootBlock = {
    id: 'block:root:root:0',
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            id: 'block:root:button:0',
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            events: {
              onClick: [{ id: 'a', type: 'ScrollTo', params: { blockId: 'not_there' } }],
            },
          },
        ],
      },
    },
  };
  const context = await testContext({
    lowdefy,
    rootBlock,
  });
  const button = context._internal.RootBlocks.map['block:root:button:0'];
  button.triggerEvent({ name: 'onClick' });
  expect(mockDocGetElementById.mock.calls).toEqual([['not_there']]);
  expect(mockElemScrollIntoView.mock.calls).toEqual([]);
  expect(mockWindowScrollTo.mock.calls).toEqual([]);
});
