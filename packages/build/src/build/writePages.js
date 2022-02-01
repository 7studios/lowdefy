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

import { type } from '@lowdefy/helpers';

async function writePage({ page, context }) {
  if (!type.isObject(page)) {
    throw new Error(`Page is not an object. Received ${JSON.stringify(page)}`);
  }
  await context.writeBuildArtifact(
    `pages/${page.pageId}/${page.pageId}.json`,
    JSON.stringify(page, null, 2)
  );
}

async function writePages({ components, context }) {
  if (type.isNone(components.pages)) return;
  if (!type.isArray(components.pages)) {
    throw new Error(`Pages is not an array.`);
  }
  const writePromises = components.pages.map((page) => writePage({ page, context }));
  return Promise.all(writePromises);
}

export default writePages;
