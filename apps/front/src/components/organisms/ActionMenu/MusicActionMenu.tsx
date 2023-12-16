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

import { Button } from '@/components/atoms/Button';
import { OptionIcon } from '@/icons/OptionIcon';

import { buttonStyle, contentStyle } from './style';

type RemoveFromPlaylistAction = {
  type: 'removeFromPlaylist';
};

type AddToPlaylistAction = {
  type: 'addToPlaylist';
  playlistId: Model.PlaylistInfo['id'];
};

type CreatePlaylistAction = {
  type: 'createPlaylist';
};

type PrependQueueAction = {
  type: 'prependQueue';
};

type AppendQueueAction = {
  type: 'appendQueue';
};

type LikeAction = {
  type: 'like';
};

export type MusicAction =
  | RemoveFromPlaylistAction
  | AddToPlaylistAction
  | CreatePlaylistAction
  | PrependQueueAction
  | AppendQueueAction
  | LikeAction;

export interface MusicActionMenuProps {
  showRemoveFromPlaylist?: boolean;
  playlist?: Model.PlaylistInfo[];
  onClick?: (action: MusicAction) => void;
}

export const MusicActionMenu: React.FC<MusicActionMenuProps> = ({
  showRemoveFromPlaylist = false,
  playlist,
  onClick,
}) => {
  return (
    <Root>
      <Trigger asChild>
        <Button hoverStyle={false} css={[tw`p-0`]}>
          <OptionIcon />
        </Button>
      </Trigger>

      <Portal>
        <Content align="start" css={[contentStyle]}>
          {showRemoveFromPlaylist && (
            <Item css={[tw`text-left`]} asChild>
              <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'removeFromPlaylist' })}>
                플레이리스트에서 제거
              </Button>
            </Item>
          )}
          <Sub>
            <SubTrigger asChild>
              <Button css={[buttonStyle]}>
                플레이리스트에 추가
                <HiListBullet />
              </Button>
            </SubTrigger>
            <Portal>
              <SubContent css={[contentStyle]}>
                <Item asChild>
                  <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'createPlaylist' })}>
                    새 플레이리스트 생성
                  </Button>
                </Item>
                {playlist?.map((item) => (
                  <Item key={item.id} asChild>
                    <Button
                      css={[buttonStyle]}
                      onClick={() => onClick?.({ type: 'addToPlaylist', playlistId: item.id })}
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
