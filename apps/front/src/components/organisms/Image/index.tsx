import { PencilIcon } from '@heroicons/react/24/solid';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';

interface ImageProps extends NextImageProps {
  editable?: boolean;
  onImageChange?: (image: File) => void;
}

export const Image: React.FC<ImageProps> = ({
  editable = false,
  src,
  className,
  alt,
  onImageChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHover, setHover] = useState(false);
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
    <div
      className={className}
      css={[tw`relative overflow-hidden rounded-md`]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {editable && (
        <div
          css={[
            tw`absolute top-0 w-full h-full`,
            tw`flex justify-center items-center`,
            tw`bg-black bg-opacity-75`,
            tw`cursor-pointer`,
            tw`invisible opacity-0 transition-opacity`,
            isHover && tw`visible opacity-100`,
          ]}
          onClick={handleClickEdit}
        >
          <input
            css={[tw`hidden`]}
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleUploadImage}
          />
          <PencilIcon css={[tw`w-10 h-10`]} />
        </div>
      )}
      <NextImage
        src={viewSrc}
        alt={alt}
        css={[tw`object-cover object-center`, tw`h-full w-full`]}
        {...rest}
      />
    </div>
  );
};
