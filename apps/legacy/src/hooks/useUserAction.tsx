import { useCallback, useState } from 'react';
import React from 'react';

import { UserAction } from '@/components/organisms/ActionMenu/UserActionMenu';
import { UserPreferenceEditModal } from '@/components/templates/UserPreferenceEditModal';
import { useAuthStore } from '@/store/authStore';

import { useEditUserPreferenceMutation } from './api/useEditUserPreferenceMutation';

type ModalType = 'none' | 'userPreference';
export const useUserAction = () => {
  const { user, logout } = useAuthStore();
  const [modalType, setModalType] = useState<ModalType>('none');

  const { mutate: editUserPreferenceMutation } = useEditUserPreferenceMutation({
    onSuccess: () => setModalType('none'),
  });

  const handleUserAction = useCallback(
    (action: UserAction) => {
      if (action.type === 'editUserPreference') setModalType('userPreference');
      if (action.type === 'logout') logout();
    },
    [logout],
  );

  const UserActionModalRenderer = useCallback(
    () => (
      <React.Fragment>
        {modalType === 'userPreference' && user && (
          <UserPreferenceEditModal
            open={modalType === 'userPreference'}
            userPreference={user}
            onSubmit={editUserPreferenceMutation}
            onClose={() => setModalType('none')}
          />
        )}
      </React.Fragment>
    ),
    [editUserPreferenceMutation, modalType, user],
  );

  return { handleUserAction, UserActionModalRenderer };
};
