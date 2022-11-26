/**
 * Requests that will save to store using svelte-query
 **/
import { useInfiniteQuery, useQuery } from '@sveltestack/svelte-query';

import { client } from '@/lib/services';

import type {
  CommentList,
  CommentListRequest,
  CommentLoadMoreKey,
  DiscoveryList,
  Episode,
  EpisodeList,
  InboxList,
  Podcast,
  SearchPreset,
  SearchResultList,
  UserStats,
} from '@/lib/models';

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

/**
 * Individual Podcast
 * @param pid
 * @returns Podcast
 */
const podcast = async (pid: string): Promise<Podcast> => {
  const { data } = await client.get(`/podcast/get?pid=${pid}`);
  return data.data;
};

export const usePodcast = (pid: string) => useQuery(['podcast', pid], () => podcast(pid));

/**
 * Comment list
 * @param eid
 * @param pageParam
 * @returns CommentList
 */
const commentList = async (eid: string, pageParam: CommentLoadMoreKey): Promise<CommentList> => {
  let request: CommentListRequest = { order: 'HOT', owner: { type: 'EPISODE', id: eid } };
  if (pageParam) request = { loadMoreKey: pageParam, ...request };

  const { data } = await client.post('/comment/list-primary', request);
  return data;
};

/**
 * Episode List
 * @param pid
 * @param limit
 * @returns EpisodeList
 */
const episodeList = async (pid: string, limit = 15): Promise<EpisodeList> => {
  const { data } = await client.post('/episode/list', { pid, limit });
  return data;
};

export const useEpisodeList = (pid: string) => useQuery('episode-list', () => episodeList(pid));

// {querykey, pageParam} are what pass to the queryFn
export const useCommentList = (eid: string) =>
  useInfiniteQuery(['comment-list', eid], ({ pageParam }) => commentList(eid, pageParam), {
    getNextPageParam: (lastList) => {
      return lastList.loadMoreKey ? lastList.loadMoreKey : undefined;
    },
    retry: false,
  });

/**
 * Inbox list
 * @param limit
 * @returns InboxList
 */
const inboxList = async (limit = 10): Promise<InboxList> => {
  const { data } = await client.post('/inbox/list', { limit });
  return data;
};

export const useInboxList = () => useQuery('inbox-list', () => inboxList());

/**
 * Search
 * @returns SearchPreset[]
 */
const searchPreset = async (): Promise<SearchPreset[]> => {
  const { data } = await client.get('/search/get-preset');
  return data.data;
};

export const useSearchPreset = () => useQuery('search-preset', () => searchPreset());

/**
 * Search result list
 * @param keyword
 * @returns SearchResultList
 */
const searchResultList = async (keyword: string): Promise<SearchResultList> => {
  const request = { keyword, limit: 20, type: 'ALL' };
  const { data } = await client.post('search/create', request);
  return data;
};

export const useSearchResultList = (keyword: string) => useQuery('search-result', () => searchResultList(keyword));

/**
 * User stats
 * @param uid
 * @returns UserStats
 */
const userStats = async (uid: string): Promise<UserStats> => {
  const { data } = await client.get(`/user-stats/get?uid=${uid}`);
  return data.data;
};

export const useUserStats = (uid: string) => useQuery('user-stats', () => userStats(uid));
