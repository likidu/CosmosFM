import type { Comment } from './Comment';
import type { Episode } from './Episode';

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

export type DiscoveryList = {
  data: [DiscoveryBanner, EditorPickList, TopList];
  loadMoreKey: string;
};
