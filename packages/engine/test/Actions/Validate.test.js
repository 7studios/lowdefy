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

const closeLoader = jest.fn();
const displayMessage = jest.fn();
const lowdefy = {
  displayMessage,
  pageId,
};

const RealDate = Date;
const mockDate = jest.fn(() => ({ date: 0 }));
mockDate.now = jest.fn(() => 0);

// Comment out to use console
console.log = () => {};
console.error = () => {};

beforeEach(() => {
  displayMessage.mockReset();
  closeLoader.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
});

beforeAll(() => {
  global.Date = mockDate;
});

afterAll(() => {
  global.Date = RealDate;
});

test('Validate required field', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            required: true,
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
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
  const { button, text1 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: ['This field is required'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    error: {
      action: {
        id: 'validate',
        type: 'Validate',
      },
      error: {
        error: new Error('Your input has 1 validation error.'),
        index: 0,
        type: 'Validate',
      },
    },
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        error: new Error('Your input has 1 validation error.'),
      },
    },
    success: false,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: ['This field is required'],
    status: 'error',
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "Your input has 1 validation error.",
          "duration": 6,
          "status": "error",
        },
      ],
    ]
  `);
  displayMessage.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
  text1.setValue('text1');
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        response: undefined,
      },
    },
    success: true,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(displayMessage.mock.calls).toEqual([]);
  displayMessage.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
});

test('Validate all fields', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text2', key: 'text2' } },
                message: 'text2 does not match pattern "text2"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
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
  const { button, text1, text2 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    error: {
      action: {
        id: 'validate',
        type: 'Validate',
      },
      error: {
        error: new Error('Your input has 2 validation errors.'),
        index: 0,
        type: 'Validate',
      },
    },
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        error: new Error('Your input has 2 validation errors.'),
      },
    },
    success: false,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: 'error',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: 'error',
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "Your input has 2 validation errors.",
          "duration": 6,
          "status": "error",
        },
      ],
    ]
  `);
  displayMessage.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
  text1.setValue('text1');
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    error: {
      action: {
        id: 'validate',
        type: 'Validate',
      },
      error: {
        error: new Error('Your input has 1 validation error.'),
        index: 0,
        type: 'Validate',
      },
    },
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        error: new Error('Your input has 1 validation error.'),
      },
    },
    success: false,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: 'error',
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "Your input has 1 validation error.",
          "duration": 6,
          "status": "error",
        },
      ],
    ]
  `);
  displayMessage.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
  text2.setValue('text2');
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        response: undefined,
      },
    },
    success: true,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`Array []`);
});

test('Validate only one field', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text2', key: 'text2' } },
                message: 'text2 does not match pattern "text2"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
                  params: 'text1',
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
  const { button, text1, text2 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    error: {
      action: {
        id: 'validate',
        params: 'text1',
        type: 'Validate',
      },
      error: {
        error: new Error('Your input has 1 validation error.'),
        index: 0,
        type: 'Validate',
      },
    },
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        error: new Error('Your input has 1 validation error.'),
      },
    },
    success: false,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: 'error',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: null,
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "Your input has 1 validation error.",
          "duration": 6,
          "status": "error",
        },
      ],
    ]
  `);
  displayMessage.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
  text1.setValue('text1');
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        response: undefined,
      },
    },
    success: true,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: null,
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`Array []`);
});

test('Validate list of fields', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text2', key: 'text2' } },
                message: 'text2 does not match pattern "text2"',
              },
            ],
          },
          {
            blockId: 'text3',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text3', key: 'text3' } },
                message: 'text3 does not match pattern "text3"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
                  params: ['text1', 'text2'],
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
  const { button, text1, text2, text3 } = context.RootBlocks.map;
  text1.setValue('text1');
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: null,
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: null,
    warnings: [],
  });
  expect(text3.eval.validation).toEqual({
    errors: ['text3 does not match pattern "text3"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    error: {
      action: {
        id: 'validate',
        params: ['text1', 'text2'],
        type: 'Validate',
      },
      error: {
        error: new Error('Your input has 1 validation error.'),
        index: 0,
        type: 'Validate',
      },
    },
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        error: new Error('Your input has 1 validation error.'),
      },
    },
    success: false,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "Your input has 1 validation error.",
          "duration": 6,
          "status": "error",
        },
      ],
    ]
  `);
  displayMessage.mockReset();
  displayMessage.mockImplementation(() => closeLoader);
  text2.setValue('text2');
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: [],
    status: 'success',
    warnings: [],
  });
  expect(text3.eval.validation).toEqual({
    errors: ['text3 does not match pattern "text3"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        response: undefined,
      },
    },
    success: true,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text3.eval.validation).toEqual({
    errors: ['text3 does not match pattern "text3"'],
    status: null,
    warnings: [],
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`Array []`);
});

test('Invalid Validate params', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
                  params: 1,
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
  const { button } = context.RootBlocks.map;
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    error: {
      action: {
        id: 'validate',
        params: 1,
        type: 'Validate',
      },
      error: {
        error: new Error('Invalid validate params.'),
        index: 0,
        type: 'Validate',
      },
    },
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
        error: new Error('Invalid validate params.'),
      },
    },
    success: false,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(displayMessage.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "Invalid validate params.",
          "duration": 6,
          "status": "error",
        },
      ],
    ]
  `);
});

test('Validate does not fail on warnings', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                status: 'warning',
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
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
  const { button, text1 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: null,
    warnings: ['text1 does not match pattern "text1"'],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    event: undefined,
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        index: 0,
      },
    },
    success: true,
    startTimestamp: { date: 0 },
    endTimestamp: { date: 0 },
  });
  expect(text1.eval.validation).toEqual({
    errors: [],
    status: 'warning',
    warnings: ['text1 does not match pattern "text1"'],
  });
});

test('Validate on nested objects using params.regex string', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'obj.text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text2', key: 'text2' } },
                message: 'text2 does not match pattern "text2"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
                  params: {
                    regex: '^obj.*1$',
                  },
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
  const { button, 'obj.text1': text1 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    error: {
      error: { type: 'Validate', error: new Error('Your input has 1 validation error.'), index: 0 },
      action: { id: 'validate', type: 'Validate', params: { regex: '^obj.*1$' } },
    },
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        error: new Error('Your input has 1 validation error.'),
        index: 0,
      },
    },
    endTimestamp: { date: 0 },
    startTimestamp: { date: 0 },
    success: false,
  });
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: 'error',
    warnings: [],
  });
});

test('Validate on nested objects using params.regex array', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'obj.text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'obj.abc1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'abc1', key: 'abc1' } },
                message: 'abc1 does not match pattern "abc1"',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text2', key: 'text2' } },
                message: 'text2 does not match pattern "text2"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
                  params: {
                    regex: ['^obj.*1$'],
                  },
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
  const { button, text2, 'obj.text1': text1, 'obj.abc1': abc1 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    error: {
      error: {
        type: 'Validate',
        error: new Error('Your input has 2 validation errors.'),
        index: 0,
      },
      action: { id: 'validate', type: 'Validate', params: { regex: ['^obj.*1$'] } },
    },
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        error: new Error('Your input has 2 validation errors.'),
        index: 0,
      },
    },
    endTimestamp: { date: 0 },
    startTimestamp: { date: 0 },
    success: false,
  });
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: 'error',
    warnings: [],
  });
  expect(abc1.eval.validation).toEqual({
    errors: ['abc1 does not match pattern "abc1"'],
    status: 'error',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: null,
    warnings: [],
  });
});

test('Validate on nested objects using params.regex array and blockIds', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'container',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'obj.text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text1', key: 'text1' } },
                message: 'text1 does not match pattern "text1"',
              },
            ],
          },
          {
            blockId: 'obj.abc1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'abc1', key: 'abc1' } },
                message: 'abc1 does not match pattern "abc1"',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: 'text2', key: 'text2' } },
                message: 'text2 does not match pattern "text2"',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            events: {
              onClick: [
                {
                  id: 'validate',
                  type: 'Validate',
                  params: {
                    regex: ['^obj.*t1$'],
                    blockIds: ['text2'],
                  },
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
  const { button, text2, 'obj.text1': text1, 'obj.abc1': abc1 } = context.RootBlocks.map;
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: null,
    warnings: [],
  });
  await button.triggerEvent({ name: 'onClick' });
  expect(button.Events.events.onClick.history[0]).toEqual({
    blockId: 'button',
    bounced: false,
    error: {
      error: {
        type: 'Validate',
        error: new Error('Your input has 2 validation errors.'),
        index: 0,
      },
      action: {
        id: 'validate',
        type: 'Validate',
        params: { regex: ['^obj.*t1$'], blockIds: ['text2'] },
      },
    },
    event: undefined,
    eventName: 'onClick',
    responses: {
      validate: {
        type: 'Validate',
        error: new Error('Your input has 2 validation errors.'),
        index: 0,
      },
    },
    endTimestamp: { date: 0 },
    startTimestamp: { date: 0 },
    success: false,
  });
  expect(text1.eval.validation).toEqual({
    errors: ['text1 does not match pattern "text1"'],
    status: 'error',
    warnings: [],
  });
  expect(text2.eval.validation).toEqual({
    errors: ['text2 does not match pattern "text2"'],
    status: 'error',
    warnings: [],
  });
  expect(abc1.eval.validation).toEqual({
    errors: ['abc1 does not match pattern "abc1"'],
    status: null,
    warnings: [],
  });
});
