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

import { useRouter } from 'next/router';

import Page from './Page.js';
import Reload from './Reload.js';
import setPageId from '../utils/setPageId.js';
import setupLink from '../utils/setupLink.js';
import useRootConfig from '../utils/useRootConfig.js';

const App = ({ lowdefy }) => {
  const router = useRouter();
  const { data: rootConfig } = useRootConfig();

  window.lowdefy = lowdefy;

  lowdefy.home = rootConfig.home;
  lowdefy.lowdefyGlobal = rootConfig.lowdefyGlobal;
  lowdefy.menus = rootConfig.menus;

  lowdefy._internal.basePath = router.basePath;
  lowdefy._internal.pathname = router.pathname;
  lowdefy._internal.query = router.query;
  lowdefy._internal.router = router;
  lowdefy._internal.link = setupLink({ lowdefy });

  const redirect = setPageId(lowdefy);
  if (redirect) {
    lowdefy._internal.router.push(`/${lowdefy.pageId}`);
  }

  return (
    <Reload lowdefy={lowdefy}>
      <Page lowdefy={lowdefy} />
    </Reload>
  );
};

export default App;
