import React from 'react';
import axios from 'axios';

import { useQuery, useQueryCache, useMutation, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';

function RandomUser() {
  const cache = useQueryCache();
  const [intervalMs, setIntervalMs] = React.useState(1000);

  const { status, data, error, isFetching } = useQuery(
    'random-user',
    async () => {
      const { data } = await axios.get('https://randomuser.me/api');
      return data;
    },
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    }
  );

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>Auto Refetch with stale-time set to {intervalMs / 1000}s)</h1>
      <p>
        This example is best experienced on your own machine, where you can open
        multiple tabs to the same localhost server and see your changes
        propagate between the two.
      </p>
      <label>
        Query Interval speed (ms):{' '}
        <input
          value={intervalMs}
          onChange={(ev) => setIntervalMs(Number(ev.target.value))}
          type="number"
          step="100"
        />{' '}
        <span
          style={{
            display: 'inline-block',
            marginLeft: '.5rem',
            width: 10,
            height: 10,
            background: isFetching ? 'green' : 'transparent',
            transition: !isFetching ? 'all .3s ease' : 'none',
            borderRadius: '100%',
            transform: 'scale(2)',
          }}
        />
      </label>

      <JSONPretty id="json-pretty" data={data} />

      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default RandomUser;
