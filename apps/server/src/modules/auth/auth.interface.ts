import { Model } from '@music/types';
import { Strategy } from 'passport-oauth2';

export interface GoogleUserInfo extends Model.BaseUserInfo {
  provider: Model.Provider.GOOGLE;
}

// export interface GithubUser extends OAuthProfile {
//   provider: Model.Provider.GOOGLE;
// }

// export interface KakaoUser extends OAuthProfile {
//   provider: Model.Provider.GOOGLE;
// }

export declare class CustomStrategy<T> extends Strategy {
  params: Record<string, any>;

  getParameter(): Record<string, any>;
  getAuthorizationURL(): string;
  getProfile(code: string, redirect_uri: string): Promise<T>;
}

export interface OAuthState {
  redirect: string;
  callback: string;
  provider: Model.Provider;
}
