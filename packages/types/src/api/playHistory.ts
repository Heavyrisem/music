import { IBaseResponse, Model } from "../..";

export namespace PlayHistoryService {
  export interface GetUserPlayHistoryRequest {
    maxCount?: number;
  }
  export interface GetUserPlayHistoryResponse
    extends IBaseResponse<Model.MusicInfo[]> {}

  export interface SavePlayHistoryRequest extends Pick<Model.MusicInfo, "id"> {}
  export interface SavePlayHistoryResponse extends IBaseResponse<{}> {}
}
