import type { Color } from './Color';
import type { Episode } from './Episode';
import type { Image } from './Image';
import type { User } from './User';

export type Podcast = {
  type: 'PODCAST';
  pid: string;
  title: string;
  author: string;
  brief: string;
  description: string;
  subscriptionCount: number;
  image: Image;
  color: Color;
  syncMode: 'RSS';
  episodeCount: number;
  latestEpisodePubDate: string;
  subscriptionStatus: 'ON' | 'OFF';
  subscriptionPush: boolean;
  subscriptionStar: boolean;
  status: 'NORMAL';
  payEpisodeCount: number;
  podcasters: User[];
};

export type CategoryRequest = {
  omitSubscribed: boolean;
  tab: 'ALL' | 'HOT' | 'RECOMMEND';
  categoryId: string;
};

// Wrapped with 'data' key
export type Category = {
  podcast: Podcast;
  episode: Episode;
};
