import { Model } from '@music/types';
import React, { useCallback, useState } from 'react';

import { PlaylistAction } from '@/components/organisms/ActionMenu/PlaylistActionMenu';
import { PlaylistEditModal } from '@/components/templates/PlaylistEditModal';
import { usePlayerContext } from '@/context/PlayerContext';

type ModalType = 'none' | 'editPlaylist';

export const usePlaylistAction = () => {
  const { appendQueue, prependQueue } = usePlayerContext();
  const [modalType, setModalType] = useState<ModalType>('none');

  const [edittingPlaylist, setEdittingPlaylist] = useState<Model.PlaylistInfo>();

  const closeModal = useCallback(() => {
    setModalType('none');
  }, []);

  const playlistActionHandler = useCallback(
    (playlistInfo: Model.PlaylistInfo, action: PlaylistAction) => {
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
        // FIXME: deletePlaylist
        console.log('FIXME: deletePlaylist');
      }
    },
    [appendQueue, prependQueue],
  );

  const PlaylistActionModalRenderer = useCallback(
    () => (
      <React.Fragment>
        {modalType == 'editPlaylist' && edittingPlaylist && (
          <PlaylistEditModal
            open={true}
            playlistDetail={edittingPlaylist}
            onSubmit={console.log}
            onClose={closeModal}
          />
        )}
      </React.Fragment>
    ),
    [closeModal, edittingPlaylist, modalType],
  );

  return { playlistActionHandler, PlaylistActionModalRenderer };
};
