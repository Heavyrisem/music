import { Model } from "../..";

export interface PlaylistInfo {
  id: number;
  name: string;
}

export interface PlaylistDetail extends PlaylistInfo {
  description: string;
  coverImageUrl: string;
  musicList: MusicInfo[];
  author: Model.UserInfo;
}

export interface MusicInfo {
  youtubeId: string;
  title: string;
  artist: string[];
  album: string;
  thumbnailUrl: string;
  duration: number;
  isExplicit: boolean;
}
