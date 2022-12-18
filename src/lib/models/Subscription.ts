import type { Podcast } from './Podcast';

export type SubscriptionMode = 'ON' | 'OFF';

export type SubscriptionUpdateRequest = {
  currentPageName: number;
  pid: string;
  mode: SubscriptionMode;
  sourcePageName: number;
};

export type SubscriptionListRequest = {
  sortOrder: 'desc' | 'aesc';
  limit: number;
  sortBy: string;
};

export type SubscriptionList = {
  data: Podcast[];
};
