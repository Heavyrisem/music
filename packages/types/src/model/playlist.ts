import { Model } from "../..";

export interface PlaylistInfo {
  id: number;
  name: string;
}

export interface PlaylistDetail extends PlaylistInfo {
  description: string;
  coverImageUrl: string;
  musicList: Model.MusicInfo[];
  author: Model.UserInfo;
}
