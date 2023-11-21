export enum Provider {
  GOOGLE = "google",
}

export interface UserInfo {
  provider: Provider;
  providerId: string;
  name: string;
  createdAt: Date;
}
