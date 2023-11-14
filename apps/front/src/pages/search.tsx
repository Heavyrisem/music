import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Whisper } from 'next/font/google';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { MusicSearchResult, getSearchMusic } from '@/api/music';
import { MusicLayout } from '@/components/Layout/MusicLayout';
import { Button } from '@/components/atoms/Button';
import { OptionIcon } from '@/icons/OptionIcon';
import { useBgColorStore } from '@/store/bgColorStore';
import { headerCellDivider, tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

const SearchPage: React.FC = () => {
  const { setGradation } = useBgColorStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [popoverIndex, setPopoverIndex] = useState<number>();

  //   useEffect(() => {
  //     if (!query) router.push('/');
  //   }, [query, router]);

  const { data: searchResult } = useQuery({
    queryKey: [getSearchMusic.name, query],
    queryFn: () => (query ? getSearchMusic(query) : undefined),
  });

  const handleClickOptionButton = useCallback((index: number) => {
    setPopoverIndex((prev) => (prev === index ? undefined : index));
  }, []);

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
          fillHeight
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
              {(rowData, index = -1) => {
                const data = rowData as MusicSearchResult;
                return (
                  <div css={[tw`flex gap-1 items-center`]}>
                    <div>{formatSecondsToTime(data.duration)}</div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <Button hover={false} css={[tw`p-0`]}>
                          <OptionIcon />
                        </Button>
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          css={[
                            tw`bg-gray-200 bg-opacity-20 backdrop-blur`,
                            tw`rounded-md`,
                            tw`flex flex-col`,
                            tw`text-sm text-gray-200 text-opacity-75`,
                          ]}
                        >
                          <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger asChild>
                              <Button>플레이리스트에 추가</Button>
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.Portal>
                              <DropdownMenu.SubContent
                                css={[
                                  tw`bg-gray-200 bg-opacity-20 backdrop-blur`,
                                  tw`rounded-md`,
                                  tw`flex flex-col`,
                                  tw`text-sm text-gray-200 text-opacity-75`,
                                ]}
                              >
                                <DropdownMenu.Item asChild>
                                  <Button>Forza Horizon Pulse</Button>
                                </DropdownMenu.Item>
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Sub>
                          <DropdownMenu.Item asChild>
                            <Button>다음으로 재생</Button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <Button>좋아요</Button>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                    {/* <Popover isOpen={index === popoverIndex} content={<div>asdf</div>}>
              <Button
                css={[tw`flex items-center`, tw`p-0 hover:bg-transparent`]}
                onClick={() => handleClickOptionButton(index)}
              >
              </Button>
            </Popover> */}
                    {/* <OptionIcon /> */}
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

// <Table
//   data={searchResult}
//   fillHeight
//   css={[tableDefaultStyle, tableBgStyle, tw`text-sm`]}
//   rowHeight={60}
// >
//   <Column flexGrow={0.4}>
//     <HeaderCell>노래</HeaderCell>
//     <Cell dataKey="title">
//       {(rowData) => {
//         const data = rowData as MusicSearchResult;
//         return (
//           <div css={[tw`flex justify-center items-center gap-2`]}>
//             <Image
//               src={data.thumbnailUrl}
//               width={42}
//               height={42}
//               alt=""
//               css={[tw`rounded-md`]}
//             />
//             <div>{data.title}</div>
//           </div>
//         );
//       }}
//     </Cell>
//   </Column>
//   <Column flexGrow={0.3}>
//     <HeaderCell>아티스트</HeaderCell>
//     <Cell dataKey="artist" />
//   </Column>
//   <Column flexGrow={0.2}>
//     <HeaderCell>앨범</HeaderCell>
//     <Cell dataKey="album" />
//   </Column>
//   <Column flexGrow={0.1}>
//     <HeaderCell>시간</HeaderCell>
//     <Cell dataKey="duration">
//       {(rowData, index = -1) => {
//         const data = rowData as MusicSearchResult;
//         return (
//           <div css={[tw`flex gap-1 items-center`]}>
//             <div>{formatSecondsToTime(data.duration)}</div>
//             {/* <Popover isOpen={index === popoverIndex} content={<div>asdf</div>}>
//               <Button
//                 css={[tw`flex items-center`, tw`p-0 hover:bg-transparent`]}
//                 onClick={() => handleClickOptionButton(index)}
//               >
//               </Button>
//             </Popover> */}
//             <Whisper placement="autoVerticalStart" trigger="click" speaker={}>
//               <IconButton appearance='subtle' icon={<OptionIcon />} />
//             </Whisper>
//             {/* <OptionIcon /> */}
//           </div>
//         );
//       }}
//     </Cell>
//   </Column>
// </Table>
