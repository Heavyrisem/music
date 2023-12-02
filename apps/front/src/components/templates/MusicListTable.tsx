import { Model } from '@music/types';
import React from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

import { Image } from '../organisms/Image';
import { MusicAction } from './MusicAction';

interface MusicListTableProps {
  data?: Model.MusicInfo[];
  userPlaylist?: Model.PlaylistInfo[];
  isLoading?: boolean;
  onMusicAction?: (musicInfo: Model.MusicInfo, action: MusicAction) => void;
}

export const MusicListTable: React.FC<MusicListTableProps> = ({
  data,
  isLoading,
  userPlaylist,
  onMusicAction,
}) => {
  return (
    <>
      <Table
        data={data}
        css={[tableDefaultStyle, tableBgStyle, tw`text-sm`]}
        rowHeight={60}
        loading={isLoading}
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
                  <MusicAction
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
