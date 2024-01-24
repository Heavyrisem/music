import { Model, UserService } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const edituserPreference = (
  data: UserService.EditUserPreferenceRequest,
): Promise<Model.UserInfo> => {
  return axiosInstance
    .put<UserService.EditUserPreferenceResponse>('/api/user', data)
    .then((res) => res.data.data);
};
