import React from 'react';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import RandomUser from './RandomUser';

const queryCache = new QueryCache();

function AutoRefetching() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <RandomUser />
    </ReactQueryCacheProvider>
  );
}

export default AutoRefetching;
