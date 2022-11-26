/**
 * Authorizations
 */
export type RefreshToken = {
  'x-jike-access-token': string;
  'x-jike-refresh-token': string;
};

export type RefreshTokenResponse = RefreshToken & {
  success: 'true' | 'false';
};

export type RefreshTokenStorage = {
  accessToken: string;
  refreshToken: string;
};

export enum PhoneArea {
  US = '+1',
  China = '+86',
}

export type PhoneNumber = {
  mobilePhoneNumber: string;
  areaCode: string;
};

export type LoginWithSMS = PhoneNumber & { verifyCode: string };

export type AuthError = {
  success: boolean;
  code: number;
  toast: string;
};
