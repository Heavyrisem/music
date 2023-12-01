import { Model, MusicService, PlaylistService } from '@music/types';

import { axiosInstance } from './axiosInstance';

const thumbnailUrl =
  'https://lh3.googleusercontent.com/bm0WFPaXBYSnv9g0qNffrErNV8yn_9dkRneuKEjynUUjy9giC6E6zZZ7Op4jWLGDlkHRCk5M68aWlLp9=w60-h60-l90-rj';
export const getSearchMusic = async ({ query }: MusicService.GetSearchMusicRequest) => {
  return axiosInstance
    .get<MusicService.GetSearchMusicResponse>('/api/music/search', { params: { query } })
    .then((res) => res.data.data);
};

export const getUserPlaylist = async (): Promise<Model.PlaylistInfo[]> => {
  return axiosInstance
    .get<PlaylistService.GetUserPlaylistResponse>('/api/playlist')
    .then((res) => res.data.data);
};

export const getPlaylistDetail = async (id: number): Promise<Model.PlaylistDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Forza Horizon Pulse',
        musicList: [
          { title: '제목-1', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
        ],
        coverImageUrl: '/fh5.jpg',
        author: 'Heavyrisem',
        description: '🏁',
      });
    }, 1000);
  });
};

export const updatePlaylistDetail = async (
  playlistDetail: MusicService.UpdatePlaylistDetailRequest,
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('update PlaylistDetail', playlistDetail);
      resolve(undefined);
    }, 1000);
  });
};
