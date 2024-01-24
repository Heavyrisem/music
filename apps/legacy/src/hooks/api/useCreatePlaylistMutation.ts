import { Model, PlaylistService } from '@music/types';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPlaylist, getUserPlaylist } from '@/api/playlist';

interface UseCreatePlaylistMutationArgs {
  onSuccess?: (data: Model.PlaylistInfo) => void;
}

export const useCreatePlaylistMutation = ({
  onSuccess,
}: UseCreatePlaylistMutationArgs): UseMutationResult<
  Model.PlaylistInfo,
  Error,
  PlaylistService.CreatePlaylistRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [createPlaylist.name],
    mutationFn: createPlaylist,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: [getUserPlaylist.name] });
    },
  });
};
