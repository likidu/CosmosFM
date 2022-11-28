import type { Image } from './Image';
import type { Podcast } from './Podcast';

export type MediaSourceMode = typeof MediaSourceMode[keyof typeof MediaSourceMode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MediaSourceMode = {
  PUBLIC: 'PUBLIC',
} as const;

type MediaSource = {
  mode: MediaSourceMode;
  url: string;
};

export type MediaContent = {
  id: string;
  size: number;
  mimeType: string;
  source: MediaSource;
  backupSource: MediaSource;
};

export type Episode = {
  type: 'EPISODE';
  eid: string;
  pid: string;
  title: string;
  shownotes: string;
  description: string;
  image: Image;
  isPrivateMedia: boolean;
  mediaKey: string;
  media: MediaContent;
  clapCount: number;
  commentCount: number;
  playCount: number;
  favoriteCount: number;
  pubDate: string;
  status: 'NORMAL';
  duration: number;
  podcast: Podcast;
  isPlayed: boolean;
  isFinished: boolean;
  isPicked: boolean;
  isFavorited: boolean;
  payType: 'FREE';
};

export type EpisodeList = {
  data: Episode[];
  loadNextKey: {
    pubDate: string;
    id: string;
    direction: 'NEXT';
  };
  loadMoreKey: {
    pubDate: string;
    id: string;
    direction: 'NEXT';
  };
  total: number;
};
