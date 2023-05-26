/**
 * Requests that will save to store using svelte-query
 **/
import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';

import { client } from '@/lib/services';

import type {
  CommentList,
  CommentListRequest,
  CommentLoadMoreKey,
  DiscoveryList,
  DiscoveryListMoreKey,
  DiscoveryListRequest,
  Episode,
  EpisodeList,
  EpisodeLoadMoreKey,
  InboxList,
  Podcast,
  SearchPreset,
  SearchResultList,
  SubscriptionList,
  UserStats,
} from '@/lib/models';
import type { AxiosError } from 'axios';

/**
 * Discovery list
 * @returns DiscoveryList
 */
const discoveryList = async (pageParam?: DiscoveryListMoreKey): Promise<DiscoveryList> => {
  let request: DiscoveryListRequest = { returnAll: false };
  if (pageParam) request = { loadMoreKey: pageParam, ...request };

  const { data } = await client.post('/discovery-feed/list', request);
  return data;
};

// {querykey, pageParam} are what pass to the queryFn
// export const useDiscoveryList = () => useQuery(['discovery'], () => discoveryList());

export const useDiscoveryList = () =>
  createInfiniteQuery<DiscoveryList, AxiosError>(['discovery'], ({ pageParam }) => discoveryList(pageParam), {
    getNextPageParam: (lastList) => {
      return lastList.loadMoreKey ? lastList.loadMoreKey : undefined;
    },
    retry: false,
  });

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
  createQuery(['episode', eid], () => episode(eid), { enabled: !!eid, refetchOnWindowFocus: false });

/**
 * Individual Podcast
 * @param pid
 * @returns Podcast
 */
const podcast = async (pid: string): Promise<Podcast> => {
  const { data } = await client.get(`/podcast/get?pid=${pid}`);
  return data.data;
};

export const usePodcast = (pid: string) => createQuery(['podcast', pid], () => podcast(pid));

/**
 * Comment list
 * @param eid
 * @param pageParam: what's returned from getNextPageParam()
 * @returns CommentList
 */
const commentList = async (eid: string, pageParam: CommentLoadMoreKey): Promise<CommentList> => {
  let request: CommentListRequest = { order: 'HOT', owner: { type: 'EPISODE', id: eid } };
  if (pageParam) request = { loadMoreKey: pageParam, ...request };

  const { data } = await client.post('/comment/list-primary', request);
  return data;
};

// {querykey, pageParam} are what pass to the queryFn
export const useCommentList = (eid: string) =>
  createInfiniteQuery(['comment-list', eid], ({ pageParam }) => commentList(eid, pageParam), {
    getNextPageParam: (lastList) => {
      return lastList.loadMoreKey ? lastList.loadMoreKey : undefined;
    },
    retry: false,
  });

/**
 * Episode List
 * @param pid
 * @param limit = 10
 * @returns EpisodeList
 */
const episodeList = async (pid: string, pageParam: EpisodeLoadMoreKey, limit = 10): Promise<EpisodeList> => {
  const { data } = await client.post('/episode/list', { pid, limit, ...(!!pageParam && { loadMoreKey: pageParam }) });
  return data;
};

// export const useEpisodeList = (pid: string) => createQuery(['episode-list'], () => episodeList(pid));

export const useEpisodeList = (pid: string) =>
  createInfiniteQuery(['episode-list', pid], ({ pageParam }) => episodeList(pid, pageParam), {
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

export const useInboxList = () => createQuery(['inbox-list'], () => inboxList());

/**
 * Subscription list
 * @param limit
 * @returns SubscriptionList
 */
const subscriptionList = async (limit = 20): Promise<SubscriptionList> => {
  const { data } = await client.post('/subscription/list', { sortOrder: 'desc', limit, sortBy: 'subscribedAt' });
  return data;
};

export const useSubscriptionList = () => createQuery(['subscription-list'], () => subscriptionList());

/**
 * Search
 * @returns SearchPreset[]
 */
const searchPreset = async (): Promise<SearchPreset[]> => {
  const { data } = await client.get('/search/get-preset');
  return data.data;
};

export const useSearchPreset = () => createQuery(['search-preset'], () => searchPreset());

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

export const useSearchResultList = (keyword: string) => createQuery(['search-result'], () => searchResultList(keyword));

/**
 * User stats
 * @param uid
 * @returns UserStats
 */
const userStats = async (uid: string): Promise<UserStats> => {
  const { data } = await client.get(`/user-stats/get?uid=${uid}`);
  return data.data;
};

export const useUserStats = (uid: string) => createQuery(['user-stats'], () => userStats(uid));
