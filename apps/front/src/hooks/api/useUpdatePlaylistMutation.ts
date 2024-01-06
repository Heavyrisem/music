import { Model, PlaylistService } from '@music/types';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPlaylistDetail, getUserPlaylist, updatePlaylistDetail } from '@/api/playlist';

interface UseUpdatePlaylistMutation {
  onSuccess?: (data: Model.PlaylistInfo) => void;
}

export const useUpdatePlaylistMutation = ({
  onSuccess,
}: UseUpdatePlaylistMutation): UseMutationResult<
  Model.PlaylistInfo,
  Error,
  PlaylistService.UpdatePlaylistInfoRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [updatePlaylistDetail.name],
    mutationFn: updatePlaylistDetail,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: [getPlaylistDetail.name, data.id] });
      queryClient.invalidateQueries({ queryKey: [getUserPlaylist.name] });
    },
  });
};
