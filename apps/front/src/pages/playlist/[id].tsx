import { PlayIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaShuffle } from 'react-icons/fa6';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { uploadImage } from '@/api/image';
import { getPlaylistDetail, getUserPlaylist, updatePlaylistDetail } from '@/api/music';
import { Button } from '@/components/atoms/Button';
import { Image } from '@/components/organisms/Image';
import { MusicAction } from '@/components/templates/MusicAction';
import { PlaylistEditModal } from '@/components/templates/PlaylistEditModal';
import { tableBgStyle, tableDefaultStyle } from '@/styles/table';
import { formatSecondsToTime } from '@/utils/time';

const playButtonStyle = [tw`flex items-center gap-2 text-sm`];

const PlayListPage = () => {
  const router = useRouter();
  const playlistId = useMemo(() => Number(router.query?.id), [router.query?.id]);

  const { data: userPlaylist, isLoading: playlistLoading } = useQuery({
    queryKey: [getUserPlaylist.name],
    queryFn: () => getUserPlaylist(),
  });
  const { data: playlistDetail, isLoading: playlistDetailLoading } = useQuery({
    queryKey: [getPlaylistDetail.name, playlistId],
    queryFn: () => getPlaylistDetail(playlistId as number),
    enabled: typeof playlistId === 'number' && !isNaN(playlistId),
  });

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleSubmitEdit = useCallback(async (editData: Model.PlaylistDetail, image?: File) => {
    const editedPlaylistDetail = { ...editData };
    if (image) {
      const coverImage = await uploadImage({ file: image });
      console.log(coverImage);
      editedPlaylistDetail.coverImageUrl = coverImage.url;
    }

    await updatePlaylistDetail(editedPlaylistDetail);
    setEditModalOpen(false);
  }, []);

  return (
    <MusicLayout css={[tw`flex flex-col`]}>
      {playlistDetail && (
        <>
          <div css={[tw`flex w-full`]}>
            <Image
              src={playlistDetail.coverImageUrl}
              width={256}
              height={256}
              alt=""
              css={[tw`rounded-lg`]}
            />
            <div css={[tw`flex flex-col justify-between p-4 flex-1`]}>
              <div>
                <div css={[tw`text-gray-200 text-opacity-60 font-bold text-3xl`]}>
                  {playlistDetail.name}
                </div>
                <div css={[[tw`text-gray-200 text-opacity-40 text-2xl`]]}>
                  {playlistDetail.author}
                </div>
              </div>
              <div>{playlistDetail.description}</div>
              <div css={[tw`flex justify-between`]}>
                <div css={[tw`flex gap-2`]}>
                  <Button css={[playButtonStyle]} bgStyle>
                    <PlayIcon css={[tw`h-4 w-4`]} />
                    재생
                  </Button>
                  <Button css={[playButtonStyle]} bgStyle>
                    <FaShuffle />
                    셔플 재생
                  </Button>
                </div>
                <Button css={[playButtonStyle]} onClick={() => setEditModalOpen(true)} bgStyle>
                  수정
                </Button>
              </div>
            </div>
          </div>
          <div css={[tw`flex-1 py-2`]}>
            <Table
              data={playlistDetail?.musicList}
              css={[tableDefaultStyle, tableBgStyle, tw`text-sm`]}
              rowHeight={60}
              loading={playlistLoading || playlistDetailLoading}
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
                        {userPlaylist && (
                          <MusicAction isPlaylist playlist={userPlaylist} onClick={console.log} />
                        )}
                      </div>
                    );
                  }}
                </Cell>
              </Column>
            </Table>
          </div>
          <PlaylistEditModal
            playlistDetail={playlistDetail}
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleSubmitEdit}
          />
        </>
      )}
    </MusicLayout>
  );
};

export default PlayListPage;
