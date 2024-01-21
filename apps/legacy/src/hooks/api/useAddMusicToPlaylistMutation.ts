import { Model, PlaylistService } from '@music/types';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { addMusicToPlaylist, getPlaylistDetail } from '@/api/playlist';

interface UseAddMusicToPlaylistMutation {
  onSuccess?: (data: Model.PlaylistInfo) => void;
}

export const useAddMusicToPlaylistMutation = ({
  onSuccess,
}: UseAddMusicToPlaylistMutation): UseMutationResult<
  Model.PlaylistInfo,
  Error,
  PlaylistService.AddMusicToPlaylistRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [addMusicToPlaylist.name],
    mutationFn: addMusicToPlaylist,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: [getPlaylistDetail.name, data.id] });
    },
  });
};
