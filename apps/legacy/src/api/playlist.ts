import { Model, PlaylistService } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const getUserPlaylist = async (): Promise<Model.PlaylistInfo[]> => {
  return axiosInstance
    .get<PlaylistService.GetUserPlaylistResponse>('/api/playlist')
    .then((res) => res.data.data);
};

export const createPlaylist = async (
  data: PlaylistService.CreatePlaylistRequest,
): Promise<Model.PlaylistInfo> => {
  return axiosInstance
    .post<PlaylistService.CreatePlaylistResponse>('/api/playlist', data)
    .then((res) => res.data.data);
};

export const deletePlaylist = async ({
  id,
}: PlaylistService.DeletePlaylistRequest): Promise<Model.PlaylistInfo> => {
  return axiosInstance
    .delete<PlaylistService.DeletePlaylistResponse>(`/api/playlist/${id}`)
    .then((res) => res.data.data);
};

export const getPlaylistDetail = async ({
  id,
}: PlaylistService.GetPlaylistInfoRequest): Promise<Model.PlaylistInfo> => {
  return axiosInstance
    .get<PlaylistService.GetPlaylistInfoResponse>(`/api/playlist/${id}`)
    .then((res) => res.data.data);
};

export const addMusicToPlaylist = async ({
  musicId,
  playlistId,
}: PlaylistService.AddMusicToPlaylistRequest): Promise<Model.PlaylistInfo> => {
  return axiosInstance
    .put<PlaylistService.AddMusicToPlaylistResponse>(`/api/playlist/${playlistId}/music`, {
      musicId,
    })
    .then((res) => res.data.data);
};

export const updatePlaylistDetail = async ({
  id,
  ...rest
}: PlaylistService.UpdatePlaylistInfoRequest) => {
  return axiosInstance
    .put<PlaylistService.UpdatePlaylistInfoResponse>(`/api/playlist/${id}`, rest)
    .then((res) => res.data.data);
};
