import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace ImageService {
  export interface UplaodImageRequest {
    file: File;
  }
  export interface UploadImageResponse
    extends IBaseResponse<Model.ObjectMetaInfo> {}

  export interface GetImageRequest {
    thumbnailId: number;
  }
  export interface GetImamgeResponse extends IBaseResponse<{}> {}
}
