import { PlayHistoryService } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const getUserPlayHistory = ({ maxCount }: PlayHistoryService.GetUserPlayHistoryRequest) => {
  return axiosInstance
    .get<PlayHistoryService.GetUserPlayHistoryResponse>(`/api/play-history`, {
      params: {
        maxCount,
      },
    })
    .then((res) => res.data.data);
};

export const savePlayHistory = ({ id }: PlayHistoryService.SavePlayHistoryRequest) => {
  return axiosInstance.post<PlayHistoryService.SavePlayHistoryResponse>(`/api/play-history/${id}`);
};
