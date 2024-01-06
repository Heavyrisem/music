import { XMarkIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import { ChangeEvent, useCallback, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Modal } from '../molecules/Modal';
import { ModalRootProps } from '../molecules/Modal/components/Modal';

export interface UserPreferenceEditModalProps extends ModalRootProps {
  userPreference: Model.UserPreference;
  onSubmit?: (data: Model.UserPreference) => void;
}

export const UserPreferenceEditModal: React.FC<UserPreferenceEditModalProps> = ({
  userPreference,
  onSubmit,
  ...rest
}) => {
  const [data, setData] = useState<Model.UserPreference>(userPreference);

  const handleInputDisplayName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      displayName: e.target.value,
    }));
  }, []);

  const handleClickSubmit = useCallback(() => {
    onSubmit?.(data);
  }, [data, onSubmit]);

  return (
    <Modal closeOnBackdropClick={false} {...rest}>
      <Modal.Content>
        <Modal.Header>
          사용자 정보 편집
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`w-4 h-4`]} />
          </Modal.CloseButton>
        </Modal.Header>
        <Modal.Body css={[tw`flex flex-col flex-1`]}>
          <Input
            description="닉네임"
            value={data.displayName}
            onChange={handleInputDisplayName}
            css={[tw`flex-1`]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClickSubmit} bgStyle>
            확인
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
