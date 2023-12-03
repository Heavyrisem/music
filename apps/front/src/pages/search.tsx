import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { getSearchMusic } from '@/api/music';
import { getUserPlaylist } from '@/api/playlist';
import { MusicListTable } from '@/components/templates/MusicListTable';
import { useUserPlaylist } from '@/hooks/api/useUserPlaylist';
import { useMusicAction } from '@/hooks/useMusicAction';
import { useAuthStore } from '@/store/authStore';

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

  const { data: userPlaylist, isLoading: playlistLoading } = useUserPlaylist();

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
