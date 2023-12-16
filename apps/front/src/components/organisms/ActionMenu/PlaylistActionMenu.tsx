import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import { HiBarsArrowDown, HiBarsArrowUp } from 'react-icons/hi2';
import tw from 'twin.macro';

import { Button } from '@/components/atoms/Button';
import { OptionIcon } from '@/icons/OptionIcon';

import { buttonStyle, contentStyle } from './style';

type PrependQueueAction = {
  type: 'prependQueue';
};

type AppendQueueAction = {
  type: 'appendQueue';
};

export type PlaylistAction = PrependQueueAction | AppendQueueAction;

export interface PlaylistActionMenuProps {
  onClick?: (action: PlaylistAction) => void;
}

export const PlaylistActionMenu = ({ onClick }: PlaylistActionMenuProps) => {
  return (
    <Root>
      <Trigger asChild>
        <Button hoverStyle={false} css={[tw`p-0`]}>
          <OptionIcon />
        </Button>
      </Trigger>

      <Portal>
        <Content align="start" css={[contentStyle]}>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'appendQueue' })}>
              바로 다음에 재생 <HiBarsArrowUp />
            </Button>
          </Item>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'appendQueue' })}>
              맨 마지막에 재생 <HiBarsArrowDown />
            </Button>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
};
