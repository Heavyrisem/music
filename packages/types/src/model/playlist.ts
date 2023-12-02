import { Model } from "../..";

export interface PlaylistInfo {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string | null | undefined;
  musicList: Model.MusicInfo[];
  author: Model.UserInfo;
}
