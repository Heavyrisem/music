import { PencilIcon } from '@heroicons/react/24/solid';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';

import { Image, ImageProps } from '@/components/atoms/Image';

interface EditableImageProps extends Omit<ImageProps, 'hoverIcon'> {
  src?: string | null;
  onImageChange?: (image: File) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onImageChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<File>();

  const handleClickEdit = useCallback(() => {
    if (!inputRef.current) return;

    inputRef.current.click();
  }, []);

  const handleUploadImage = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (!e.target.files?.[0]) return;

      onImageChange?.(e.target.files[0]);
      setPreviewImage(e.target.files[0]);
    },
    [onImageChange],
  );

  const viewSrc = useMemo(() => {
    if (previewImage) return URL.createObjectURL(previewImage);
    else return src;
  }, [previewImage, src]);

  return (
    <div>
      <input
        css={[tw`hidden`]}
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleUploadImage}
      />

      <Image
        src={viewSrc}
        css={[tw`object-cover object-center`, tw`h-full w-full`]}
        hoverIcon={<PencilIcon css={[tw`w-10 h-10`]} />}
        onClick={handleClickEdit}
        alt={alt ?? ''}
        {...rest}
      />
    </div>
  );
};
