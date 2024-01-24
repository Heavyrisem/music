import { PlayIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import React, { useCallback, useRef } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { useIsMobile } from '@/hooks/useIsMobile';
import { tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

import { Image } from '../atoms/Image';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { MusicAction, MusicActionMenu } from '../organisms/ActionMenu/MusicActionMenu';
import { TableLoadingSpinner } from '../organisms/TableLoadingSpinner';

interface MusicListTableProps {
  data?: Model.MusicInfo[];
  userPlaylist?: Model.PlaylistInfo[];
  isLoading?: boolean;
  onMusicAction?: (musicInfo: Model.MusicInfo, action: MusicAction) => void;
  onMusicPlayClick?: (musicInfo: Model.MusicInfo) => void;
  onRowClick?: (musicInfo: Model.MusicInfo) => void;
  onDoubleClickRow?: (musicInfo: Model.MusicInfo) => void;
}

export const MusicListTable: React.FC<MusicListTableProps> = ({
  data,
  isLoading,
  userPlaylist,
  onMusicAction,
  onMusicPlayClick,
  onRowClick,
  onDoubleClickRow,
}) => {
  const { isMobile } = useIsMobile();
  const doubleClickTimer = useRef<Date>(new Date());

  const handleRowClick = useCallback(
    (rowData: Model.MusicInfo) => {
      const now = new Date();
      const diff = now.getTime() - doubleClickTimer.current.getTime();
      doubleClickTimer.current = now;

      if (diff < 300) {
        onDoubleClickRow?.(rowData);
      } else {
        onRowClick?.(rowData);
      }
    },
    [onRowClick, onDoubleClickRow],
  );

  return (
    <>
      <Table
        data={data}
        css={[tableDefaultStyle, tableBgStyle, tw`text-sm`]}
        rowHeight={60}
        loading={isLoading}
        renderLoading={() => <TableLoadingSpinner />}
        renderEmpty={() => (
          <div css={[tw`w-full h-full`, tw`flex justify-center items-center`]}>
            노래가 없습니다.
          </div>
        )}
        onRowClick={handleRowClick}
        fillHeight
      >
        <Column flexGrow={0.4}>
          <HeaderCell>노래</HeaderCell>
          <Cell dataKey="title">
            {(rowData) => {
              const data = rowData as Model.MusicInfo;
              return (
                <div
                  css={[tw`flex justify-center items-center gap-2`]}
                  onClick={() => {
                    onMusicPlayClick?.(data);
                  }}
                >
                  <Image
                    src={data.thumbnailUrl}
                    width={isMobile ? 32 : 42}
                    height={isMobile ? 32 : 42}
                    alt=""
                    css={[tw`rounded-md`]}
                    hoverIcon={<PlayIcon css={[tw`h-8 w-8 lg:(h-10 w-10)`]} />}
                  />
                  <div css={[tw`whitespace-nowrap text-ellipsis overflow-hidden`]}>
                    {data.title}
                  </div>
                </div>
              );
            }}
          </Cell>
        </Column>
        {!isMobile && (
          <Column flexGrow={0.3}>
            <HeaderCell>아티스트</HeaderCell>
            <Cell dataKey="artist">
              {(rowData) => {
                const data = rowData as Model.MusicInfo;
                return (
                  <div css={[tw`whitespace-nowrap text-ellipsis overflow-hidden`]}>
                    {data.artist.join(', ')}
                  </div>
                );
              }}
            </Cell>
          </Column>
        )}
        {!isMobile && (
          <Column flexGrow={0.2}>
            <HeaderCell>앨범</HeaderCell>
            <Cell dataKey="album" />
          </Column>
        )}
        {!isMobile && (
          <Column flexGrow={0.1}>
            <HeaderCell>시간</HeaderCell>
            <Cell dataKey="duration">
              {(rowData) => {
                const data = rowData as Model.MusicInfo;
                return formatSecondsToTime(data.duration);
              }}
            </Cell>
          </Column>
        )}
        (
        <Column>
          <HeaderCell>동작</HeaderCell>
          <Cell>
            {(rowData) => {
              const data = rowData as Model.MusicInfo;
              return (
                <MusicActionMenu
                  playlist={userPlaylist}
                  onClick={(action) => onMusicAction?.(data, action)}
                />
              );
            }}
          </Cell>
        </Column>
        )
      </Table>
    </>
  );
};
