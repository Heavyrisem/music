import { AuthService, Model } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const refetchToken = () => {
  return axiosInstance.get('/api/auth/refresh');
};

export const getAuthedUser = (): Promise<Model.UserInfo> => {
  return axiosInstance
    .get<AuthService.GetAuthedUserResponse>(`/api/auth/me`)
    .then((res) => res.data.data);
};
