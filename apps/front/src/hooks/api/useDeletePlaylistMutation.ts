import { Model, PlaylistService } from '@music/types';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePlaylist, getUserPlaylist } from '@/api/playlist';

interface UseDeletePlaylistMutation {
  onSuccess?: (data: Model.PlaylistInfo) => void;
}

export const useDeletePlaylistMutation = ({
  onSuccess,
}: UseDeletePlaylistMutation): UseMutationResult<
  Model.PlaylistInfo,
  Error,
  PlaylistService.DeletePlaylistRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [deletePlaylist.name],
    mutationFn: deletePlaylist,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: [getUserPlaylist.name] });
    },
  });
};
