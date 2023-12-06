import { XMarkIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import { ChangeEvent, useCallback, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Modal } from '../organisms/Modal';
import { ModalRootProps } from '../organisms/Modal/components/Modal';

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
      <div css={[tw`flex flex-col gap-4`]}>
        <div css={[tw`font-bold`, tw`flex justify-between items-center`, tw`min-w-[34rem]`]}>
          사용자 정보 편집
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`w-4 h-4`]} />
          </Modal.CloseButton>
        </div>
        <div css={[tw`flex flex-col gap-4 flex-1`]}>
          <Input
            description="닉네임"
            value={data.displayName}
            onChange={handleInputDisplayName}
            css={[tw`flex-1`]}
          />
        </div>
        <div css={[tw`flex justify-end gap-2`]}>
          <Button onClick={handleClickSubmit} bgStyle>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
