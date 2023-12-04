import { Model } from "../..";
import { ObjectMetaInfo } from "./object";

export interface PlaylistInfo {
  id: number;
  name: string;
  description: string;
  thumbnail: null | ObjectMetaInfo;
  musicList: Model.MusicInfo[];
  author: Model.UserInfo;
}
