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

export interface UserInfo extends BaseUserInfo {
  id: number;
  createdAt: Date;
}
