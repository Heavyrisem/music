import { XMarkIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Modal } from '../organisms/Modal';
import { ModalRootProps } from '../organisms/Modal/components/Modal';

interface PlaylistModalProps extends ModalRootProps {
  playlistDetail: Model.PlaylistDetail;
  onSubmit?: (data: Model.PlaylistDetail) => void;
}

export const PlaylistEditModal: React.FC<PlaylistModalProps> = ({
  playlistDetail,
  onSubmit,
  ...rest
}) => {
  const [editingData, setEditingData] = useState(playlistDetail);

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
    onSubmit?.(editingData);
  }, [editingData, onSubmit]);

  return (
    <Modal closeOnBackdropClick={false} {...rest}>
      <div css={[tw`flex flex-col gap-4`]}>
        <div css={[tw`font-bold`, tw`flex justify-between items-center`, tw`w-96`]}>
          플레이리스트 편집
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`w-4 h-4`]} />
          </Modal.CloseButton>
        </div>
        <div css={[tw`flex gap-2`]}>
          <Image
            src={playlistDetail.thumbnailUrl}
            width={128}
            height={128}
            alt=""
            css={[tw`rounded-md`]}
          />
          <div css={[tw`flex-1 flex flex-col justify-between`]}>
            <Input defaultValue={playlistDetail.name} onChange={handleInputName} />
            <Textarea
              css={[tw`h-20`]}
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
