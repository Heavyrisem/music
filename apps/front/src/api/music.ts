import { MusicService } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const getSearchMusic = async ({ query }: MusicService.GetSearchMusicRequest) => {
  return axiosInstance
    .get<MusicService.GetSearchMusicResponse>('/api/music/search', { params: { query } })
    .then((res) => res.data.data);
};

export const getMusicData = async ({ id }: MusicService.GetMusicDataRequest) => {
  return axiosInstance
    .get(`/api/music/${id}`, { responseType: 'arraybuffer' })
    .then((res) => res.data);
};

export const getTopPlayedMusic = async ({ maxCount }: MusicService.GetTopPlayedMusicRequest) => {
  return axiosInstance
    .get<MusicService.GetTopPlayedMusicResponse>('/api/music/top', {
      params: { maxCount: maxCount ?? 20 },
    })
    .then((res) => res.data.data);
};
