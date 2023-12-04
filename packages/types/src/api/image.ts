import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace ImageService {
  export interface UplaodImageRequest {
    file: File;
  }
  export interface UploadImageResponse extends IBaseResponse<Model.ImageInfo> {}
}
