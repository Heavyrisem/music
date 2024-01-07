import { Model } from '@music/types';
import { Content, Item, Portal, Root, Separator, Trigger } from '@radix-ui/react-dropdown-menu';
import { HiCog6Tooth, HiMiniArrowRightOnRectangle, HiPencil } from 'react-icons/hi2';
import tw from 'twin.macro';

import { Button } from '@/components/atoms/Button';
import { Image } from '@/components/atoms/Image';

import { buttonStyle, contentStyle, separatorStyle } from './style';

type EditUserPreference = {
  type: 'editUserPreference';
};

type Logout = {
  type: 'logout';
};

export type UserAction = EditUserPreference | Logout;

interface UserActionMenuProps {
  user: Model.UserInfo;
  onClick?: (action: UserAction) => void;
}

export const UserActionMenu = ({ user, onClick }: UserActionMenuProps) => {
  return (
    <Root>
      <Trigger asChild>
        <Button hoverStyle={false} css={[tw`p-1 rounded-full overflow-hidden`]}>
          <Image
            src={user.profileImage}
            width={32}
            height={32}
            css={[tw`rounded-full`, tw`w-6 h-6 lg:(h-8 w-8)`]}
            alt="profile"
          />
        </Button>
      </Trigger>

      <Portal>
        <Content align="end" css={[contentStyle]}>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'editUserPreference' })}>
              계정 정보 수정 <HiPencil />
            </Button>
          </Item>
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'editUserPreference' })}>
              설정 <HiCog6Tooth />
            </Button>
          </Item>
          <Separator css={[separatorStyle]} />
          <Item css={[tw`text-left`]} asChild>
            <Button css={[buttonStyle]} onClick={() => onClick?.({ type: 'logout' })}>
              로그아웃 <HiMiniArrowRightOnRectangle />
            </Button>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
};
