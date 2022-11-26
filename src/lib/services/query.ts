/**
 * Requests that will save to store using svelte-query
 **/
import { useQuery, useInfiniteQuery } from '@sveltestack/svelte-query';

import { client } from '@/lib/services';

import type { DiscoveryList } from '@/lib/models';

// Discovery list
const discoveryList = async (): Promise<DiscoveryList> => {
  const request = { returnAll: false };

  const { data } = await client.post('/discovery-feed/list', request);
  return data;
};

// {querykey, pageParam} are what pass to the queryFn
export const useDiscoveryList = () => useQuery(['discovery'], () => discoveryList());
