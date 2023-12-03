import { Model } from "../..";
import { IBaseResponse } from "./common";

export namespace UserService {
  export interface EditUserPreferenceRequest
    extends Partial<Model.UserPreference> {}
  export interface EditUserPreferenceResponse
    extends IBaseResponse<Model.UserInfo> {}
}
