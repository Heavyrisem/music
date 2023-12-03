import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace ImageService {
  export interface UplaodImageRequest {
    file: File;
    path: string;
    filename: string;
  }
  export interface UploadImageResponse extends IBaseResponse<Model.ImageInfo> {}
}
