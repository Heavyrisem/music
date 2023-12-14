import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { getSearchMusic } from '@/api/music';
import { MusicListTable } from '@/components/templates/MusicListTable';
import { usePlayerContext } from '@/context/PlayerContext';
import { useUserPlaylist } from '@/hooks/api/useUserPlaylist';
import { useMusicAction } from '@/hooks/useMusicAction';

const SearchPage: React.FC = () => {
  const { setMusic } = usePlayerContext();

  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const { musicActionHandler, MusicActionModalRenderer } = useMusicAction();

  const { data: searchResult, isLoading: searchLoading } = useQuery({
    queryKey: [getSearchMusic.name, query],
    queryFn: () => getSearchMusic({ query: query! }),
    enabled: typeof query === 'string',
  });

  const { data: userPlaylist, isLoading: playlistLoading } = useUserPlaylist();

  return (
    <MusicLayout css={[tw`flex flex-col`]}>
      <div>{`"${query}"`}에 대한 검색 결과</div>
      <div css={[tw`flex-1`]}>
        <MusicListTable
          data={searchResult}
          isLoading={searchLoading || playlistLoading}
          userPlaylist={userPlaylist}
          onMusicAction={musicActionHandler}
          onMusicPlayClick={setMusic}
          onDoubleClickRow={setMusic}
        />
      </div>
      <MusicActionModalRenderer />
    </MusicLayout>
  );
};

export default SearchPage;
