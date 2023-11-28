import { axiosInstance } from './axiosInstance';

export const refetchToken = () => {
  return axiosInstance.get('/api/auth/refresh');
};
