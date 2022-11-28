export type SubscriptionMode = 'ON' | 'OFF';

export type SubscriptionUpdateRequest = {
  currentPageName: number;
  pid: string;
  mode: SubscriptionMode;
  sourcePageName: number;
};

export type SubscriptionList = {};
