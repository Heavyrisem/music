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

export interface PlaylistModalProps extends ModalRootProps {
  playlistDetail: Model.PlaylistDetail;
  onSubmit?: (data: Model.PlaylistDetail, image?: File) => void;
}

export const PlaylistEditModal: React.FC<PlaylistModalProps> = ({
  playlistDetail,
  onSubmit,
  ...rest
}) => {
  const [editingData, setEditingData] = useState(playlistDetail);
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
          플레이리스트 편집
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`w-4 h-4`]} />
          </Modal.CloseButton>
        </div>
        <div css={[tw`flex gap-4`]}>
          <Image
            editable
            src={playlistDetail.coverImageUrl}
            width={200}
            height={200}
            alt=""
            css={[tw`rounded-md w-48 h-48`]}
            onImageChange={setCoverImage}
          />
          <div css={[tw`flex-1 flex flex-col justify-between gap-4`]}>
            <Input defaultValue={playlistDetail.name} onChange={handleInputName} css={[tw`py-1`]} />
            <Textarea
              css={[tw`flex-1 p-1`]}
              defaultValue={playlistDetail.description}
              onChange={handleInputDescription}
            />
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