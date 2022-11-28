import type { Episode } from './Episode';

type LoadMoreKey = {
  pubDate: string;
  id: string;
};

export type InboxList = {
  data: Episode[];
  loadMoreKey: LoadMoreKey;
};
