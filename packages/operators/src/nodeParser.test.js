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

/* eslint-disable max-classes-per-file */
import NodeParser from './nodeParser.js';

console.error = () => {};

const args = [{ args: true }];

const operators = {
  _test: jest.fn(() => 'test'),
  _error: jest.fn(() => {
    throw new Error('Test error.');
  }),
  _init: jest.fn(),
};

operators._init.init = jest.fn();

const location = 'location';

const payload = {
  payload: true,
};

const secrets = {
  secrets: true,
};

const user = {
  user: true,
};

test('parse input undefined', async () => {
  const parser = new NodeParser({ operators, payload });
  await parser.init();
  const res = parser.parse({});
  expect(res.output).toEqual();
  expect(res.errors).toEqual([]);
});

test('parse args not array', async () => {
  const input = {};
  const args = 'not an array';
  const parser = new NodeParser({ operators, payload });
  await parser.init();
  expect(() => parser.parse({ args, input })).toThrow('Operator parser args must be an array.');
});

test('parse location not string', async () => {
  const input = {};
  const location = [];
  const parser = new NodeParser({ operators, payload, secrets, user });
  await parser.init();
  expect(() => parser.parse({ args, input, location })).toThrow(
    'Operator parser location must be a string.'
  );
});

test('operator returns value', async () => {
  const input = { a: { _test: { params: true } } };
  const parser = new NodeParser({ operators, payload, secrets, user });
  await parser.init();
  const res = parser.parse({ args, input, location });
  expect(res.output).toEqual({ a: 'test' });
  expect(operators._test.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "args": Array [
            Object {
              "args": true,
            },
          ],
          "arrayIndices": Array [],
          "env": "node",
          "location": "location",
          "methodName": undefined,
          "operators": Object {
            "_error": [MockFunction],
            "_init": [MockFunction],
            "_test": [MockFunction] {
              "calls": [Circular],
              "results": Array [
                Object {
                  "type": "return",
                  "value": "test",
                },
              ],
            },
          },
          "params": Object {
            "params": true,
          },
          "parser": NodeParser {
            "operators": Object {
              "_error": [MockFunction],
              "_init": [MockFunction],
              "_test": [MockFunction] {
                "calls": [Circular],
                "results": Array [
                  Object {
                    "type": "return",
                    "value": "test",
                  },
                ],
              },
            },
            "parse": [Function],
            "payload": Object {
              "payload": true,
            },
            "secrets": Object {
              "secrets": true,
            },
            "user": Object {
              "user": true,
            },
          },
          "payload": Object {
            "payload": true,
          },
          "secrets": Object {
            "secrets": true,
          },
          "user": Object {
            "user": true,
          },
        },
      ],
    ]
  `);
  expect(res.errors).toEqual([]);
});

test('operator should be object with 1 key', async () => {
  const input = { a: { _test: { params: true }, x: 1 } };
  const parser = new NodeParser({ operators, payload, secrets, user });
  await parser.init();
  const res = parser.parse({ args, input, location });
  expect(res.output).toEqual(input);
  expect(res.errors).toEqual([]);
});

test('undefined operator', async () => {
  const input = { a: { _id: { params: true } } };
  const parser = new NodeParser({ operators, payload, secrets, user });
  await parser.init();
  const res = parser.parse({ args, input, location });
  expect(res.output).toEqual(input);
  expect(res.errors).toEqual([]);
});

test('operator errors', async () => {
  const input = { a: { _error: { params: true } } };
  const parser = new NodeParser({ operators, payload, secrets, user });
  await parser.init();
  const res = parser.parse({ args, input, location });
  expect(res.output).toEqual({ a: null });
  expect(res.errors).toEqual([new Error('Test error.')]);
});

test('operator init', async () => {
  const parser = new NodeParser({ operators, payload, secrets, user });
  await parser.init();
  expect(operators._init.init).toHaveBeenCalledTimes(1);
});
