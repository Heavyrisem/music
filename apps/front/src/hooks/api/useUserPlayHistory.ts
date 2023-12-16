import { Model, PlayHistoryService } from '@music/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getUserPlayHistory } from '@/api/playHistory';
import { useAuthStore } from '@/store/authStore';

interface UseUserPlayHistory extends PlayHistoryService.GetUserPlayHistoryRequest {}

export const useUserPlayHistory = ({
  maxCount,
}: UseUserPlayHistory): UseQueryResult<Model.MusicInfo[], Error> => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: [getUserPlayHistory.name, maxCount],
    queryFn: () => getUserPlayHistory({ maxCount }),
    enabled: !!user,
  });
};
