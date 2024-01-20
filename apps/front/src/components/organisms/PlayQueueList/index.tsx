import { Model } from '@music/types';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Arrow, Close, Content, Popover, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiMiniBars4 } from 'react-icons/hi2';
import tw from 'twin.macro';

import { Button } from '@/components/atoms/Button';
import { QueuedMusicInfo } from '@/context/PlayerContext';
import useOutsideClick from '@/hooks/useOutsideClick';
import { textStyle } from '@/styles/global';

import { QueueMusicAction } from '../ActionMenu/QueueMusicActionMenu';
import { Item } from './components/Item';

interface PlayQueueListProps {
  queue?: QueuedMusicInfo[] | null;
  onDoubleClickMusic?: (music: QueuedMusicInfo) => void;
  onQueueAction?: (music: QueuedMusicInfo, action: QueueMusicAction) => void;
}

export const PlayQueueList = ({ queue, onDoubleClickMusic, onQueueAction }: PlayQueueListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number>();

  const doubleClickTimer = useRef<Date>(new Date());
  const handleClickItem = useCallback(
    (music: QueuedMusicInfo, index: number) => {
      const now = new Date();
      const diff = now.getTime() - doubleClickTimer.current.getTime();
      doubleClickTimer.current = now;

      if (diff < 300) {
        onDoubleClickMusic?.(music);
      } else {
        setSelected(index);
      }
    },
    [onDoubleClickMusic],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelected(undefined);
    }
  }, []);

  useEffect(() => {
    console.log(queue);
  }, [queue]);

  return (
    <Root onOpenChange={handleOpenChange}>
      <Trigger asChild>
        <Button css={[tw`m-auto p-2`]}>
          <HiMiniBars4 />
        </Button>
      </Trigger>

      <Portal>
        <Content
          sideOffset={5}
          align="end"
          css={[
            tw`min-w-[10rem] z-10`,
            tw`bg-gray-200 bg-opacity-10 backdrop-blur-3xl`,
            tw`rounded-md border-2 border-gray-200 border-opacity-10`,
            tw`overflow-hidden select-none`,
            tw`text-sm`,
            textStyle,
          ]}
        >
          <div css={[tw`p-2`]} onClick={() => setSelected(undefined)}>
            {queue?.length ? '재생 대기 목록' : '재생 대기 목록이 비었습니다.'}
          </div>
          {queue?.length ? (
            <div css={[tw`h-[1px] mx-0.5`, tw`bg-gray-200 bg-opacity-20 backdrop-blur`]} />
          ) : null}
          <div ref={listRef}>
            {queue?.map((music, idx) => (
              <Item
                key={idx}
                music={music}
                selected={idx === selected}
                onClick={(music) => handleClickItem(music, idx)}
                onAction={onQueueAction}
              />
            ))}
          </div>
        </Content>
      </Portal>
    </Root>
  );
};
