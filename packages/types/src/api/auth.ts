import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace AuthService {
  export interface GetAuthedUserRequest {}
  export interface GetAuthedUserResponse
    extends IBaseResponse<Model.UserInfo> {}
}
