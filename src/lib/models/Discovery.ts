import type { Comment } from './Comment';
import type { Episode } from './Episode';
import type { Podcast } from './Podcast';
import type { UserBase } from './User';

/**
 * Default page
 */

export type DiscoveryBanner = {
  type: 'DISCOVERY_BANNER';
  data: [
    {
      id: string;
      image: string;
      position: 'TOP' | 'BOTTOM';
      priority: 5;
      type: 'EDITORS_PICK_BANNER';
      url: string;
      voiceover: string;
    },
  ];
};

// TODO: discoveryCollectionUppserRows -> DISCOVERY_PICK has the same data structure
export type EditorPickList = {
  type: 'EDITOR_PICK';
  data: {
    date: string;
    picks: [{ episode: Episode; comment: Comment }];
  };
};

export type TopList = {
  type: 'TOP_LIST';
  data: [
    {
      type: 'TOP_LIST';
      id: string;
      title: string;
      category: 'HOT_EPISODES_IN_24_HOURS' | 'SKYROCKET_EPISODES' | 'NEW_STAR_EPISODES';
      targetType: 'EPISODE';
      publishDate: string;
      information: string;
      items: [{ item: Episode }];
      background: string;
    },
  ];
};

/**
 * discoveryCollectionUppserRows -> DISCOVERY_COLLECTION | NEW_POWER | DISCOVERY_PICK
 */

// TODO: For moduleType HPR_MULTI_RECALL, target is podcast: Podcast instead of episode: Episode
export type DiscoveryCollectionList = {
  type: 'DISCOVERY_COLLECTION';
  data: [
    {
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
    },
  ];
};

export type NewPowerList = {
  type: 'NEW_POWER';
  data: {
    id: string;
    items: Podcast[];
    publishDate: string;
    serialNumber: number;
  };
};

/**
 * discoveryCollectionLowerRows -> DISCOVERY_COLLECTION | USER_INTEREST | PILOT
 */

export type DiscoveryListMoreKey = 'discoveryCollectionUppserRows' | 'discoveryCollectionLowerRows';

export type DiscoveryListRequest = {
  returnAll: boolean;
  loadMoreKey?: DiscoveryListMoreKey;
};

export type DiscoveryList = {
  data: [DiscoveryBanner, EditorPickList, TopList, DiscoveryCollectionList, NewPowerList];
  loadMoreKey?: DiscoveryListMoreKey;
};
