import {
  Content,
  DropdownMenuProps,
  Item,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { HiOutlineMinus } from 'react-icons/hi2';
import tw from 'twin.macro';

import { Button } from '@/components/atoms/Button';
import { OptionIcon } from '@/icons/OptionIcon';

import { buttonStyle, contentStyle } from './style';

type RemoveFromQueueAction = {
  type: 'removeFromQueue';
};

export type QueueMusicAction = RemoveFromQueueAction;

interface QueueMusicActionMenuProps extends DropdownMenuProps {
  onAction?: (action: QueueMusicAction) => void;
}

export const QueueMusicActionMenu = ({ onAction, ...rest }: QueueMusicActionMenuProps) => {
  return (
    <Root {...rest}>
      <Trigger asChild>
        <Button hoverStyle={false} css={[tw`p-0`]}>
          <OptionIcon />
        </Button>
      </Trigger>

      <Portal>
        <Content align="start" css={[contentStyle]}>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onAction?.({ type: 'removeFromQueue' })}>
              재생 대기 목록에서 제거 <HiOutlineMinus />
            </Button>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
};
