import type { UserBase } from './User';

type CommentUser = UserBase & { relation: 'STRANGE'; ipLoc?: string };

type Owner = {
  id: string;
  type: 'EPISODE';
};

type CommentBase = {
  id: string;
  type: 'COMMENT';
  owner: Owner;
  author: CommentUser;
  authorAssociation: 'NONE';
  text: string;
  level: number;
  likeCount: number;
  liked: boolean;
  createdAt: string;
  status: 'NORMAL';
};

export type Comment = CommentBase & {
  replies: CommentBase[];
};

export type CommentLoadMoreKey = {
  direction: 'NEXT';
  hotSortScore: number;
  id: string;
};

export type CommentListRequest = {
  order: 'HOT';
  owner: Owner;
  loadMoreKey?: CommentLoadMoreKey;
};

export type CommentList = {
  data: Comment[];
  loadNextKey: CommentLoadMoreKey;
  loadMoreKey: CommentLoadMoreKey;
  totalCount: number;
};
