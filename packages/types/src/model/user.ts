export enum Provider {
  GOOGLE = "google",
}

export interface BaseUserInfo {
  provider: Provider;
  providerId: string;
  email: string;
  name: string;
  profileImage: string;
}

export interface UserPreference {
  displayName: string;
}

export interface UserInfo extends BaseUserInfo, UserPreference {
  id: number;
  createdAt: Date;
}
