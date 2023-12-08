import NextImage from 'next/image';
import { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';
import tw from 'twin.macro';

export interface ImageProps extends Omit<NextImageProps, 'src'> {
  hoverIcon?: React.ReactNode;
  src?: string | null;
}

export const Image: React.FC<ImageProps> = ({ src, className, hoverIcon, onClick, ...rest }) => {
  const [isHover, setHover] = useState(false);

  return (
    <div
      className={className}
      css={[tw`relative overflow-hidden rounded-md`]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        css={[
          tw`absolute top-0 w-full h-full`,
          tw`flex justify-center items-center`,
          tw`bg-black bg-opacity-50`,
          tw`cursor-pointer`,
          tw`invisible opacity-0 transition-opacity`,
          isHover && hoverIcon && tw`visible opacity-100`,
        ]}
        onClick={onClick}
      >
        {hoverIcon}
      </div>

      {src ? (
        <NextImage
          css={[tw`object-cover object-center`, tw`h-full w-full`]}
          onClick={onClick}
          src={src}
          {...rest}
        />
      ) : (
        <div css={[tw`h-full w-full`, tw`bg-gray-200 bg-opacity-70`]} onClick={onClick} />
      )}
    </div>
  );
};
