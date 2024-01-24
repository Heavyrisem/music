import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getMusicData } from '@/api/music';
import { usePlayerStore } from '@/store/playerStore';

interface UseMusicData {}

export const useMusicData = (id?: number): UseQueryResult<string, Error> => {
  return useQuery({
    queryKey: [getMusicData.name, id],
    queryFn: async () => {
      const data = await getMusicData({ id: id! });
      return URL.createObjectURL(new Blob([data]));
    },
    enabled: typeof id === 'number',
  });
};
