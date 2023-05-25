import type { Comment } from './Comment';
import type { Episode } from './Episode';
import type { Podcast } from './Podcast';
import type { UserBase } from './User';

/**
 * Default page
 */

export type Banner = {
  id: string;
  image: string;
  position: 'TOP' | 'BOTTOM';
  priority: 5;
  type: 'EDITORS_PICK_BANNER';
  url: string;
  voiceover: string;
};

export type DailyPicks = {
  date: string;
  picks: [{ episode: Episode; comment: Comment }];
};

export type HistoryPickList = {
  data: DailyPicks[];
};

export type TopList = {
  type: 'TOP_LIST';
  id: string;
  title: string;
  category: 'HOT_EPISODES_IN_24_HOURS' | 'SKYROCKET_EPISODES' | 'NEW_STAR_EPISODES';
  targetType: 'EPISODE';
  publishDate: string;
  information: string;
  items: [{ item: Episode }];
  background: string;
};

/**
 * discoveryCollectionUppserRows -> DISCOVERY_COLLECTION | NEW_POWER | DISCOVERY_PICK
 */

// TODO: For moduleType HPR_MULTI_RECALL, target is podcast: Podcast instead of episode: Episode
export type DiscoveryCollection = {
  title: string;
  moduleType: 'HER_SIMILAR_USER_PLAYED' | 'HER_BASED_LIKE_PODCAST' | 'HPR_MULTI_RECALL' | 'EDITOR_PICK';
  targetType: 'EPISODE' | 'PODCAST';
  lightBlueEndIndex: number;
  target: [
    {
      episode: Episode;
      hasNegativeFeedback: boolean;
      recommendation: string;
      relatedUser?: UserBase;
      relatedUsers: UserBase[] | [];
    },
  ];
};

/**
 * discoveryCollectionLowerRows -> DISCOVERY_COLLECTION | USER_INTEREST | PILOT
 */

export type DiscoveryListMoreKey = 'discoveryCollectionUppserRows' | 'discoveryCollectionLowerRows';

export type DiscoveryListRequest = {
  returnAll: boolean;
  loadMoreKey?: DiscoveryListMoreKey;
};

// TODO: discoveryCollectionUppserRows -> DISCOVERY_PICK has the same data structure
export type DiscoveryList = {
  data: [
    {
      type: 'DISCOVERY_BANNER';
      data: Banner[];
    },
    {
      type: 'EDITOR_PICK';
      data: DailyPicks;
    },
    {
      type: 'TOP_LIST';
      data: TopList[];
    },
    {
      type: 'DISCOVERY_COLLECTION';
      data: DiscoveryCollection[];
    },
    {
      type: 'NEW_POWER';
      data: {
        id: string;
        items: Podcast[];
        publishDate: string;
        serialNumber: number;
      };
    },
  ];
  loadMoreKey?: DiscoveryListMoreKey;
};
