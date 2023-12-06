import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace MusicService {
  export interface GetSearchMusicRequest {
    query: string;
  }
  export interface GetSearchMusicResponse
    extends IBaseResponse<Model.MusicInfo[]> {}

  export interface GetMusicDataRequest extends Pick<Model.MusicInfo, "id"> {}
  export interface GetMusicDataResponse extends IBaseResponse<{}> {}
}
