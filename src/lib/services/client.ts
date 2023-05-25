import type { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { get } from 'svelte/store';

import { API_CONFIG, API_ENDPOINT } from '@/lib/configs/cosmosConfig';
import type { RefreshTokenResponse } from '@/lib/models';
import { tokens } from '@/lib/stores/user';

/**
 * @summary Handler of client error from acutal API calls
 * @param error
 * @returns T
 */
export const clientHandleError = <T>(error: AxiosError) => {
  if (error.response) {
    const { data, status } = <{ data: T; status: number }>error.response;
    console.log(`Client status code: ${status}`);
    console.log(data);

    return data;
  } else {
    console.error(error.message);
  }
};

/**
 * @summary Refresh expired token
 * @param refreshToken
 * @returns {AxiosPromise<RefreshTokenResponse>} x-jike-access-token, x-jike-refresh-token, success
 */
const appAuthTokensRefresh = (refreshToken: string): AxiosPromise<RefreshTokenResponse> => {
  return client.post(`${API_ENDPOINT}/app_auth_tokens.refresh`, '', {
    headers: {
      'x-jike-refresh-token': refreshToken,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
};

/**
 * @summary Do token refreshment
 * @param error
 * @returns AxiosError
 */
const handleRject = async (error: AxiosError): Promise<AxiosError> => {
  const { config, response } = error;

  // Add a retry property
  const originalRequest = {
    retry: false,
    ...config,
  };

  /*
   * When response code is 401, try to refresh the token.
   * Eject the interceptor so it doesn't loop in case
   * token refresh causes the 401 response
   */
  if (response && response.status === 401 && !originalRequest.retry) {
    originalRequest.retry = true;

    const { refreshToken } = get(tokens) || {};
    if (refreshToken) {
      const { data } = await appAuthTokensRefresh(refreshToken);
      if (data.success) {
        client.defaults.headers.common['x-jike-access-token'] = data['x-jike-access-token'];

        // Update token store and save to LocalStorage
        tokens.update({
          accessToken: data['x-jike-access-token'],
          refreshToken: data['x-jike-refresh-token'],
        });

        client(originalRequest);
      }
    }
  }

  return Promise.reject(error);
};

export const client = axios.create(API_CONFIG);

// Request interceptor for API calls
client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { accessToken } = get(tokens) || {};
    if (accessToken) config.headers['x-jike-access-token'] = accessToken;
    return config;
  },
  (error) => handleRject(error),
);

// Response interceptor for API calls
client.interceptors.response.use(
  // Most reponses are wrapped in a "data" object except for those like refresh token and send code
  (response: AxiosResponse) => {
    // const { data } = response;
    // const actualData = data.hasOwnProperty('data') ? data.data : data;
    // return {
    //   ...response,
    //   ...actualData,
    // };
    return response;
  },
  (error) => handleRject(error),
);
