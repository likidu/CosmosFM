import type { Episode } from './Episode';

export type SearchPreset = {
  text: string;
  link: string;
  type: 'FIXED' | 'RANDOM';
  resident: boolean;
};

export type SearchResultList = {
  data: Episode[];
  highlightWord: {
    words: string[];
    singleMaxHighlightTime: number;
  };
};
