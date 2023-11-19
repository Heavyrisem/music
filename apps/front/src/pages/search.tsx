import { Model } from '@music/types';
import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { getSearchMusic, getUserPlaylist } from '@/api/music';
import { MusicAction } from '@/components/templates/MusicAction';
import { useBgColorStore } from '@/store/bgColorStore';
import { tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

const SearchPage: React.FC = () => {
  const { setGradation } = useBgColorStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  //   useEffect(() => {
  //     if (!query) router.push('/');
  //   }, [query, router]);

  const { data: searchResult, isLoading: searchLoading } = useQuery({
    queryKey: [getSearchMusic.name, query],
    queryFn: () => getSearchMusic(query as string),
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
        <Table
          data={searchResult}
          css={[tableDefaultStyle, tableBgStyle, tw`text-sm`]}
          rowHeight={60}
          loading={searchLoading || playlistLoading}
          fillHeight
        >
          <Column flexGrow={0.4}>
            <HeaderCell>노래</HeaderCell>
            <Cell dataKey="title">
              {(rowData) => {
                const data = rowData as Model.MusicInfo;
                return (
                  <div css={[tw`flex justify-center items-center gap-2`]}>
                    <Image
                      src={data.thumbnailUrl}
                      width={42}
                      height={42}
                      alt=""
                      css={[tw`rounded-md`]}
                    />
                    <div>{data.title}</div>
                  </div>
                );
              }}
            </Cell>
          </Column>
          <Column flexGrow={0.3}>
            <HeaderCell>아티스트</HeaderCell>
            <Cell dataKey="artist" />
          </Column>
          <Column flexGrow={0.2}>
            <HeaderCell>앨범</HeaderCell>
            <Cell dataKey="album" />
          </Column>
          <Column flexGrow={0.1}>
            <HeaderCell>시간</HeaderCell>
            <Cell dataKey="duration">
              {(rowData) => {
                const data = rowData as Model.MusicInfo;
                return (
                  <div css={[tw`flex gap-1 items-center`]}>
                    <div>{formatSecondsToTime(data.duration)}</div>
                    {userPlaylist && <MusicAction playlist={userPlaylist} onClick={console.log} />}
                  </div>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    </MusicLayout>
  );
};

export default SearchPage;
