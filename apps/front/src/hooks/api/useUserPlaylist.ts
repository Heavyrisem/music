import { PlaylistInfo } from '@music/types/src/model';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getUserPlaylist } from '@/api/playlist';
import { useAuthStore } from '@/store/authStore';

export const useUserPlaylist = (): UseQueryResult<PlaylistInfo[], Error> => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: [getUserPlaylist.name, user],
    queryFn: () => getUserPlaylist(),
    enabled: user !== null,
  });
};
