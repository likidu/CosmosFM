import type { PhoneNumber } from './Auth';
import type { Avatar } from './Image';

export type UserBase = {
  type: 'USER';
  uid: string;
  avatar: Avatar;
  nickname: string;
  isNicknameSet: boolean;
  isCancelled: boolean;
};

export type User = UserBase & {
  gender: 'MALE' | 'FEAMALE';
  birthYear: number;
  industry: string;
  phoneNumber: PhoneNumber;
  debug: boolean;
};

export type UserStats = {
  followingCount: number;
  followerCount: number;
  subscriptionCount: number;
  totalPlayedSeconds: number;
  totalPlaySeconds: number;
};
