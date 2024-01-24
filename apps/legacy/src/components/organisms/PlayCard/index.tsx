import { PlayIcon } from '@heroicons/react/24/solid';
import React from 'react';
import tw from 'twin.macro';

import { Image, ImageProps } from '@/components/atoms/Image';

interface PlayCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<ImageProps, 'unoptimized'> {
  imageUrl?: string | null;
  title: string;
  description: string;
  onPlayClick?: () => void;
  actionButton?: React.ReactNode;
}

export const PlayCard: React.FC<PlayCardProps> = ({
  imageUrl,
  title,
  description,
  unoptimized,
  actionButton,
  onPlayClick,
  ...rest
}) => {
  return (
    <div css={[tw`flex flex-col gap-2`, tw`max-w-[15rem]`]} {...rest}>
      <Image
        src={imageUrl}
        width={200}
        height={200}
        alt=""
        css={[tw`w-60 h-60`]}
        unoptimized={unoptimized}
        hoverIcon={<PlayIcon css={[tw`h-16 w-16`]} />}
        onClick={onPlayClick}
      />
      <div css={[tw`flex justify-between`]}>
        <div css={[tw`text-xs`]}>
          <div>{title}</div>
          <div css={[tw`text-gray-200 text-opacity-30`]}>{description}</div>
        </div>
        <div>{actionButton}</div>
      </div>
    </div>
  );
};
