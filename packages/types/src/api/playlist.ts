import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace PlaylistService {
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

  export interface CreatePlaylistRequest
    extends Omit<Model.PlaylistDetail, "id" | "musicList" | "author"> {}
  export interface CreatePlaylistResponse
    extends IBaseResponse<Model.PlaylistDetail> {}

  export interface AddMusicRequest {
    playlistId: Model.PlaylistDetail["id"];
    musicId: Model.MusicInfo["id"];
  }
  export interface AddMusicResponse extends IBaseResponse<boolean> {}
}
