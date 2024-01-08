import { XMarkIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { EditableImage } from '../molecules/EditableImage';
import { Modal } from '../molecules/Modal';
import { ModalRootProps } from '../molecules/Modal/components/Modal';

export interface PlaylistEditModalProps extends ModalRootProps {
  playlistDetail: Model.PlaylistInfo;
  onSubmit?: (data: Model.PlaylistInfo, image?: File) => void;
}

export const PlaylistEditModal: React.FC<PlaylistEditModalProps> = ({
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
      <Modal.Content>
        <Modal.Header>
          플레이리스트 편집
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`w-4 h-4`]} />
          </Modal.CloseButton>
        </Modal.Header>
        <Modal.Body css={[tw`flex flex-col lg:(flex-row)`]}>
          <EditableImage
            src={playlistDetail.thumbnail}
            width={200}
            height={200}
            alt=""
            css={[tw`rounded-md w-48 h-48`]}
            onImageChange={setCoverImage}
            unoptimized
          />
          <div css={[tw`flex-1 flex flex-col justify-between gap-4`]}>
            <Input defaultValue={playlistDetail.name} onChange={handleInputName} css={[tw`py-1`]} />
            <Textarea
              css={[tw`flex-1 p-1 px-2`]}
              defaultValue={playlistDetail.description}
              onChange={handleInputDescription}
            />
          </div>
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
