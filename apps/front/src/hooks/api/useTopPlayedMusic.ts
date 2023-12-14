import { Model, MusicService } from '@music/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getTopPlayedMusic } from '@/api/music';

interface UseTopPlayedMusic extends MusicService.GetTopPlayedMusicRequest {}

export const useTopPlayedMusic = ({
  maxCount,
}: UseTopPlayedMusic): UseQueryResult<Model.MusicInfo[], Error> => {
  return useQuery({
    queryKey: [getTopPlayedMusic.name, maxCount],
    queryFn: () => getTopPlayedMusic({ maxCount }),
  });
};
