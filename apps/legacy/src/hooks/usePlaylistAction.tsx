import { Model } from '@music/types';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { uploadImage } from '@/api/image';
import { PlaylistAction } from '@/components/organisms/ActionMenu/PlaylistActionMenu';
import { PlaylistEditModal } from '@/components/templates/PlaylistEditModal';
import { usePlayerContext } from '@/context/PlayerContext';

import { useDeletePlaylistMutation } from './api/useDeletePlaylistMutation';
import { useUpdatePlaylistMutation } from './api/useUpdatePlaylistMutation';

type ModalType = 'none' | 'editPlaylist';

export const usePlaylistAction = () => {
  const { appendQueue, prependQueue } = usePlayerContext();
  const [modalType, setModalType] = useState<ModalType>('none');

  const [edittingPlaylist, setEdittingPlaylist] = useState<Model.PlaylistInfo>();

  const closeModal = useCallback(() => {
    setModalType('none');
  }, []);

  const router = useRouter();
  const { mutate: deletePlaylistMutation } = useDeletePlaylistMutation({
    onSuccess: () => {
      router.push('/');
    },
  });

  const { mutate: updatePlaylisltMutation } = useUpdatePlaylistMutation({
    onSuccess: closeModal,
  });

  const playlistActionHandler = useCallback(
    async (playlistInfo: Model.PlaylistInfo, action: PlaylistAction) => {
      if (action.type == 'prependQueue') {
        prependQueue(playlistInfo.musicList);
      }
      if (action.type == 'appendQueue') {
        appendQueue(playlistInfo.musicList);
      }
      if (action.type == 'editPlaylist') {
        setEdittingPlaylist(playlistInfo);
        setModalType('editPlaylist');
      }
      if (action.type == 'deletePlaylist') {
        if (!confirm('정말 이 플레이리스트를 삭제하시겠습니까? 되돌릴 수 없습니다.')) return;
        deletePlaylistMutation({ id: playlistInfo.id });
      }
    },
    [appendQueue, deletePlaylistMutation, prependQueue],
  );

  const handleSubmitEdit = useCallback(
    async (editData: Model.PlaylistInfo, image?: File) => {
      const editedPlaylistDetail = { ...editData };
      if (image) {
        const thumbnail = await uploadImage({ file: image });
        editedPlaylistDetail.thumbnail = thumbnail.url;
      }

      updatePlaylisltMutation(editedPlaylistDetail);
    },
    [updatePlaylisltMutation],
  );

  const PlaylistActionModalRenderer = useCallback(
    () => (
      <React.Fragment>
        {modalType == 'editPlaylist' && edittingPlaylist && (
          <PlaylistEditModal
            open={true}
            playlistDetail={edittingPlaylist}
            onSubmit={handleSubmitEdit}
            onClose={closeModal}
          />
        )}
      </React.Fragment>
    ),
    [closeModal, edittingPlaylist, handleSubmitEdit, modalType],
  );

  return { playlistActionHandler, PlaylistActionModalRenderer };
};
