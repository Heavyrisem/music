import { PlayIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import React, { useCallback, useRef } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

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
                    width={42}
                    height={42}
                    alt=""
                    css={[tw`rounded-md`]}
                    hoverIcon={<PlayIcon css={[tw`h-6 w-6`]} />}
                  />
                  <div>{data.title}</div>
                </div>
              );
            }}
          </Cell>
        </Column>
        <Column flexGrow={0.3}>
          <HeaderCell>아티스트</HeaderCell>
          <Cell dataKey="artist">
            {(rowData) => {
              const data = rowData as Model.MusicInfo;
              return data.artist.join(', ');
            }}
          </Cell>
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
                  <MusicActionMenu
                    playlist={userPlaylist}
                    onClick={(action) => onMusicAction?.(data, action)}
                  />
                </div>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </>
  );
};
