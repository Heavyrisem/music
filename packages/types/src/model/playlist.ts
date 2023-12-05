import { Model } from "../..";

export interface PlaylistInfo {
  id: number;
  name: string;
  description: string;
  thumbnail: string | null;
  musicList: Model.MusicInfo[];
  author: Model.UserInfo;
}
