import { Model } from '@music/types';
import {
  Content,
  Item,
  Portal,
  Root,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { HiBarsArrowDown, HiBarsArrowUp, HiListBullet, HiOutlineHeart } from 'react-icons/hi2';
import tw from 'twin.macro';

import { OptionIcon } from '@/icons/OptionIcon';

import { Button } from '../atoms/Button';

interface ActionBaseInfo {
  type: 'addToPlaylist' | 'prependQueue' | 'appendQueue' | 'like';
}

interface AddToPlaylistAction extends ActionBaseInfo {
  type: 'addToPlaylist';
  playlist: Model.Playlist;
}

interface PrependQueueAction extends ActionBaseInfo {
  type: 'prependQueue';
}

interface AppendQueueAction extends ActionBaseInfo {
  type: 'appendQueue';
}

interface LikeAction extends ActionBaseInfo {
  type: 'like';
}

export type ActionInfo = AddToPlaylistAction | PrependQueueAction | AppendQueueAction | LikeAction;

interface MusicActionProps {
  playlist: Model.Playlist[];
  onClick?: (action: ActionInfo) => void;
}

const buttonStyle = [tw`flex gap-4 justify-between items-center text-left`, tw`rounded-sm`];
const contentStyle = [
  tw`bg-gray-200 bg-opacity-20 backdrop-blur`,
  tw`rounded-md border-2 border-gray-200 border-opacity-10`,
  tw`flex flex-col`,
  tw`text-sm text-gray-200 text-opacity-75 text-left`,
];

export const MusicAction: React.FC<MusicActionProps> = ({ playlist, onClick }) => {
  return (
    <Root>
      <Trigger asChild>
        <Button hover={false} css={[tw`p-0`]}>
          <OptionIcon />
        </Button>
      </Trigger>

      <Portal>
        <Content align="start" css={[contentStyle]}>
          <Sub>
            <SubTrigger asChild>
              <Button css={[buttonStyle]}>
                플레이리스트에 추가
                <HiListBullet />
              </Button>
            </SubTrigger>
            <Portal>
              <SubContent css={[contentStyle]}>
                {playlist.map((item) => (
                  <Item key={item.id} asChild>
                    <Button
                      css={[buttonStyle]}
                      onClick={() => onClick?.({ type: 'addToPlaylist', playlist: item })}
                    >
                      {item.name}
                    </Button>
                  </Item>
                ))}
              </SubContent>
            </Portal>
          </Sub>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'prependQueue' })}>
              바로 다음에 재생 <HiBarsArrowUp />
            </Button>
          </Item>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'appendQueue' })}>
              맨 마지막에 재생 <HiBarsArrowDown />
            </Button>
          </Item>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'like' })}>
              좋아요 <HiOutlineHeart />
            </Button>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
};
