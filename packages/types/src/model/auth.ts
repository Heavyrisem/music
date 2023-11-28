import { Model } from "../..";

export interface UserJwtPayload extends Pick<Model.UserInfo, "id"> {}
