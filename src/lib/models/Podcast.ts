import type { Color } from './Color';
import type { Image } from './Image';
import type { User } from './User';

export type Podcast = {
  type: 'PODCAST';
  pid: string;
  title: string;
  author: string;
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
