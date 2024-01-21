import { useState } from 'react';
import tw from 'twin.macro';

import { Image } from '@/components/atoms/Image';
import { QueuedMusicInfo } from '@/context/PlayerContext';
import { transparentTextStyle } from '@/styles/global';
import { formatSecondsToTime } from '@/utils/time';

import { QueueMusicAction, QueueMusicActionMenu } from '../../ActionMenu/QueueMusicActionMenu';

interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  selected?: boolean;
  music: QueuedMusicInfo;
  onClick?: (music: QueuedMusicInfo) => void;
  onAction?: (music: QueuedMusicInfo, action: QueueMusicAction) => void;
}

export const Item = ({ music, selected = false, onClick, onAction }: ItemProps) => {
  const [isHover, setHover] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  return (
    <div
      css={[tw`flex p-1 gap-2`, tw`rounded-sm`, selected && tw`bg-gray-200 bg-opacity-20`]}
      onClick={() => onClick?.(music)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={music.thumbnailUrl}
        width={42}
        height={42}
        alt={music.title}
        css={[tw`w-10 h-10`]}
        // hoverIcon={<PlayIcon css={[tw`h-6 w-6`]} />}
      />
      <div css={[tw`w-[10rem]`, tw`flex justify-between`]}>
        <div css={[tw`max-w-[7rem]`]}>
          <div css={[tw`text-sm whitespace-nowrap text-ellipsis overflow-hidden`]}>
            {music.title}
          </div>
          <div
            css={[
              tw`text-xs whitespace-nowrap text-ellipsis overflow-hidden`,
              transparentTextStyle,
            ]}
          >
            {music.artist.join(' ')}
          </div>
        </div>
        <div css={[tw`flex items-center px-2`, tw`text-xs`]}>
          {selected || isHover || actionMenuOpen ? (
            <QueueMusicActionMenu
              onOpenChange={setActionMenuOpen}
              onAction={(action) => onAction?.(music, action)}
            />
          ) : (
            formatSecondsToTime(music.duration)
          )}
        </div>
      </div>
    </div>
  );
};
