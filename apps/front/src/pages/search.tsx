import { Model } from '@music/types';
import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { getSearchMusic } from '@/api/music';
import { getUserPlaylist } from '@/api/playlist';
import { MusicAction } from '@/components/templates/MusicAction';
import { MusicListTable } from '@/components/templates/MusicListTable';
import { useCreatePlaylistMutation } from '@/hooks/api/useCreatePlaylistMutation';
import { useMusicAction } from '@/hooks/useMusicAction';
import { useBgColorStore } from '@/store/bgColorStore';
import { tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

const SearchPage: React.FC = () => {
  // const { setGradation } = useBgColorStore();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  //   useEffect(() => {
  //     if (!query) router.push('/');
  //   }, [query, router]);

  const { musicActionHandler, MusicActionModalRenderer } = useMusicAction();

  const { data: searchResult, isLoading: searchLoading } = useQuery({
    queryKey: [getSearchMusic.name, query],
    queryFn: () => getSearchMusic({ query: query! }),
    enabled: typeof query === 'string',
  });
  const { data: userPlaylist, isLoading: playlistLoading } = useQuery({
    queryKey: [getUserPlaylist.name],
    queryFn: () => getUserPlaylist(),
  });

  // useEffect(() => {
  //   setGradation(true);

  //   return () => {
  //     setGradation(false);
  //   };
  // }, [setGradation]);

  return (
    <MusicLayout css={[tw`flex flex-col`]}>
      <div>{`"${query}"`}에 대한 검색 결과</div>
      <div css={[tw`flex-1`]}>
        <MusicListTable
          data={searchResult}
          isLoading={searchLoading || playlistLoading}
          userPlaylist={userPlaylist}
          onMusicAction={musicActionHandler}
        />
      </div>
      <MusicActionModalRenderer />
    </MusicLayout>
  );
};

export default SearchPage;
