/**
 * Requests that will save to store using svelte-query
 **/
import { useQuery, useInfiniteQuery } from '@sveltestack/svelte-query';

import { client } from '@/lib/services';

import type { DiscoveryList, Episode } from '@/lib/models';

/**
 * Discovery list
 * @returns DiscoveryList
 */
const discoveryList = async (): Promise<DiscoveryList> => {
  const request = { returnAll: false };

  const { data } = await client.post('/discovery-feed/list', request);
  return data;
};

// {querykey, pageParam} are what pass to the queryFn
export const useDiscoveryList = () => useQuery(['discovery'], () => discoveryList());

/**
 * Individual Episode
 * @param eid
 * @returns Episode
 */
const episode = async (eid: string): Promise<Episode> => {
  const { data } = await client.get(`/episode/get?eid=${eid}`);
  return data.data;
};

// Tip on use for multiple components: Episode and Player:
// https://github.com/SvelteStack/svelte-query/issues/95#issuecomment-1210381083
export const useEpisode = (eid: string) =>
  useQuery(['episode', eid], () => episode(eid), { enabled: !!eid, refetchOnWindowFocus: false });
