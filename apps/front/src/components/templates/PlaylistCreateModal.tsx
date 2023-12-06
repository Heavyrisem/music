import { XMarkIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Image } from '../organisms/Image';
import { Modal } from '../organisms/Modal';
import { ModalRootProps } from '../organisms/Modal/components/Modal';

export type CreatePlaylistType = Pick<Model.PlaylistInfo, 'name' | 'description'>;

export interface PlaylistCreateModalProps extends ModalRootProps {
  onSubmit?: (data: CreatePlaylistType, image?: File) => void;
}

export const PlaylistCreateModal: React.FC<PlaylistCreateModalProps> = ({ onSubmit, ...rest }) => {
  const [editingData, setEditingData] = useState<CreatePlaylistType>({
    name: '',
    description: '',
  });
  const [coverImage, setCoverImage] = useState<File>();

  const handleInputName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setEditingData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  }, []);

  const handleInputDescription = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setEditingData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  }, []);

  const handleClickSubmit = useCallback(() => {
    onSubmit?.(editingData, coverImage);
  }, [coverImage, editingData, onSubmit]);

  return (
    <Modal closeOnBackdropClick={false} {...rest}>
      <div css={[tw`flex flex-col gap-4`]}>
        <div css={[tw`font-bold`, tw`flex justify-between items-center`, tw`min-w-[34rem]`]}>
          플레이리스트 생성
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`w-4 h-4`]} />
          </Modal.CloseButton>
        </div>
        <div css={[tw`flex gap-4`]}>
          <Image
            editable
            src={coverImage && URL.createObjectURL(coverImage)}
            width={200}
            height={200}
            alt=""
            css={[tw`rounded-md w-48 h-48`]}
            onImageChange={setCoverImage}
          />
          <div css={[tw`flex-1 flex flex-col justify-between gap-4`]}>
            <Input onChange={handleInputName} css={[tw`py-1`]} />
            <Textarea css={[tw`flex-1 p-1`]} onChange={handleInputDescription} />
          </div>
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
