import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { MusicSearchResult, getSearchMusic } from '@/api/music';
import { MusicLayout } from '@/components/Layout/MusicLayout';
import { OptionIcon } from '@/icons/OptionIcon';
import { useBgColorStore } from '@/store/bgColorStore';
import { headerCellDivider, tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

const SearchPage: React.FC = () => {
  const { setGradation } = useBgColorStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  //   useEffect(() => {
  //     if (!query) router.push('/');
  //   }, [query, router]);

  const { data: searchResult } = useQuery({
    queryKey: [getSearchMusic.name, query],
    queryFn: () => (query ? getSearchMusic(query) : undefined),
  });

  //   useEffect(() => {
  //     setGradation(true);

  //     return () => {
  //       setGradation(false);
  //     };
  //   }, [setGradation]);

  return (
    <MusicLayout>
      <div>{`"${query}"`}에 대한 검색 결과</div>
      <Table
        data={searchResult}
        fillHeight
        css={[tableDefaultStyle, tableBgStyle, tw`text-sm`]}
        rowHeight={60}
      >
        <Column flexGrow={0.4}>
          <HeaderCell>노래</HeaderCell>
          <Cell dataKey="title">
            {(rowData) => {
              const data = rowData as MusicSearchResult;
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
              const data = rowData as MusicSearchResult;
              return (
                <div css={[tw`flex gap-1 items-center`]}>
                  <div>{formatSecondsToTime(data.duration)}</div>
                  <OptionIcon css={[tw`cursor-pointer`]} />
                </div>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </MusicLayout>
  );
};

export default SearchPage;
