import type { AxiosRequestConfig } from 'axios';
/*
 * Constants from iOS Cosmos Podcast App
 */
export const API_ENDPOINT = 'https://api.xiaoyuzhoufm.com';
const API_VERSION = 'v1';

const deviceId = '0B13CFA4-9721-4F52-ABE5-CB351BD747FA';

const deviceProperties = {
  idfv: 'CDA222FE-2768-55C7-B1F6-3A2BAB739548',
  idfa: '00000000-0000-0000-0000-000000000000',
};

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: `${API_ENDPOINT}/${API_VERSION}`,
  headers: {
    'App-BuildNo': 1174,
    'App-Version': '2.39',
    'Access-Control-Allow-Origin': '*',
    BundleID: 'app.podcast.cosmos',
    'Content-Type': 'application/json;charset=utf-8',
    'app-permissions': 0,
    'x-jike-device-id': deviceId,
    'x-jike-device-properties': JSON.stringify(deviceProperties),
    'Accept-Language': 'en-US;q=1.0, zh-Hans-US;q=0.9',
    'X-Online-Host': 'api.xiaoyuzhoufm.com',
    WifiConnected: true,
  },
};
