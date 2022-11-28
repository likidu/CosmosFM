import type { AxiosRequestConfig } from 'axios';
/*
 * Constants from iOS Cosmos Podcast App
 */
export const INIT_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiN0h2YVwvUHVOYVVCME1nVHE1aEwwM0xXYTZxcVJBbnN0YmJyeDNUNENKMEVDZXU4T2I2TkphWnlxRUc0dUVwWmhQc3JIZEs3c2FSaFRcL01vM0VsdVg0KzViSU5VTWViQXRmSW00dUtFRFlKSnZBZHV2cmN1YmdFb2diK0pOZEdBaFJHcEZKbzJuZnluWnRSeXVoTWZ5dkZHcDFId1wvRWNRY0hjME9iTDFcLzBBWFI1UWRVUlRUcDVzdFNZOUh6K0hOZGNVaTA5WXJNRnJUOERxOSt6NGlwZXZHTWwxdHhkSE5xbFh6QlRVY3JiUEpWQytSdWtNUHdNUmx1OXVHY1RCN0lVQ0V0MDZlZVJzczFsYTlnNWk2SGE2eG5XYlZUbkR3b2IzXC84VStjdCs2SEtYMUNZSFI4eWQyaE1mM0xOakNuXC9Fb2ZvM0dJVnVzQ09WVWhLU1dFbGhKSENReVZjYU1IeVNXK25KbEp5alJJcDcrM0JZNElURU9XeWI5TnprdDVFQm5EemNLK05vMzVET0lrc0NVaTFkUGtFSkR4ZWJRNFwvczE3T2tVZE82bVk9IiwidiI6MywiaXYiOiJsUnJHdmV5RWtsR0RISUhteDhPV2VnPT0iLCJpYXQiOjE2MTA2MzI2ODUuMzI2fQ.OWobPzHrX0RSML8u6DT2hdVBmSYJR5ot7yNAQ2tE6ak';

export const INIT_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiSlBiUUI1UXpFcEZISUMwNXkrM3RzWk55MFVNVDJ1ZVpyOVlPQXhrMER1Zmp4elpPUU0xRjdlMDF5Q2w5Um1RT1I4RkFaU2ZzZnpyRVZIeExmeEtId0VNN2tZQmxKeFJDY3NcL21YbU5QWVwvRFVjZE85NHFlb29HV3VNK1lwZmZcL0xmWndFeWkyVEtueUJ3aXJmZ05Tb0JCdE5wYjgxUnVMTWtcL2VBdGhXOGFBSWl6Q0ZCY3hRVlwvV0l2M3Y3MzFKVmk3cFVVQ3o1Q3V4SU1Rd2tpVmZCYmpwSk1qcjQxdldONWNYT2tTbHpwZGpzNVhiTkFBTmFjMDJ1R05iblU0a2hFIiwidiI6MywiaXYiOiJxdG9IZkQzWU5Fa2IwaEJPSGtoYkR3PT0iLCJpYXQiOjE2MTA2MzI2ODUuMzI2fQ.-Dgp4dOmbUEl1uyOKgNRagG__bKKKys0Lx2zeLwUZCA';

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
