import { Model } from "index";
import { IBaseResponse } from "./common";

export namespace Music {
  export interface GetSearchMusicRequest {
    query: string;
  }
  export interface GetSearchMusicResponse
    extends IBaseResponse<Model.MusicInfo[]> {}

  export interface GetUserPlaylistRequest {}
  export interface GetUserPlaylistResponse
    extends IBaseResponse<Model.PlaylistInfo[]> {}

  export interface GetPlaylistDetailRequest
    extends Pick<Model.PlaylistInfo, "id"> {}
  export interface GetPlaylistDetailResponse
    extends IBaseResponse<Model.PlaylistDetail[]> {}

  export interface UpdatePlaylistDetailRequest
    extends Omit<Model.PlaylistDetail, "musicList" | "author"> {}
  export interface UpdatePlaylistDetailResponse {}
}
