import { MusicInfo } from "./music";
import { UserInfo } from "./user";

export interface PlayHistoryInfo {
  id: number;
  music: MusicInfo;
  user: UserInfo;
}
