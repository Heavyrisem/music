import { Model } from '@music/types';
import React, { useCallback, useState } from 'react';

import { uploadImage } from '@/api/image';
import { MusicAction } from '@/components/organisms/ActionMenu/MusicActionMenu';
import {
  CreatePlaylistType,
  PlaylistCreateModal,
} from '@/components/templates/PlaylistCreateModal';

import { useAddMusicToPlaylistMutation } from './api/useAddMusicToPlaylistMutation';
import { useCreatePlaylistMutation } from './api/useCreatePlaylistMutation';

type ModalType = 'none' | 'createPlaylist';

export const useMusicAction = () => {
  const [modalType, setModalType] = useState<ModalType>('none');

  const closeModal = useCallback(() => {
    setModalType('none');
  }, []);

  const { mutate: createPlaylistMutation } = useCreatePlaylistMutation({ onSuccess: closeModal });
  const { mutate: addMusicToPlaylistMutation } = useAddMusicToPlaylistMutation({});

  const musicActionHandler = useCallback(
    (musicInfo: Model.MusicInfo, action: MusicAction) => {
      if (action.type === 'createPlaylist') {
        setModalType('createPlaylist');
      }
      if (action.type === 'addToPlaylist') {
        addMusicToPlaylistMutation({ musicId: musicInfo.id, playlistId: action.playlistId });
      }
    },
    [addMusicToPlaylistMutation],
  );

  const handleCreatePlaylistSubmit = useCallback(
    async (data: CreatePlaylistType, image?: File) => {
      let imgUrl;
      if (image) imgUrl = await uploadImage({ file: image }).then((img) => `/api/image/${img.id}`);

      createPlaylistMutation({ ...data, thumbnail: imgUrl });
    },
    [createPlaylistMutation],
  );

  const MusicActionModalRenderer = useCallback(
    () => (
      <React.Fragment>
        {modalType === 'createPlaylist' && (
          <PlaylistCreateModal
            open={modalType === 'createPlaylist'}
            onSubmit={handleCreatePlaylistSubmit}
            onClose={closeModal}
          />
        )}
      </React.Fragment>
    ),
    [closeModal, handleCreatePlaylistSubmit, modalType],
  );

  return { musicActionHandler, MusicActionModalRenderer };
};
