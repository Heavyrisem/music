import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import tw from 'twin.macro';

import { QueueMusicAction } from '@/components/organisms/ActionMenu/QueueMusicActionMenu';
import { UserActionMenu } from '@/components/organisms/ActionMenu/UserActionMenu';
import { AppSidebar } from '@/components/organisms/AppSidebar';
import { DesktopMusicPlayer } from '@/components/organisms/MusicPlayer/DesktopMusicPlayer';
import { MobileMusicPlayer } from '@/components/organisms/MusicPlayer/MobileMusicPlayer';
import { PlayQueueList } from '@/components/organisms/PlayQueueList';
import { LoginModal, LoginType } from '@/components/templates/LoginModal';
import { QueuedMusicInfo, usePlayerContext } from '@/context/PlayerContext';
import { useUserPlaylist } from '@/hooks/api/useUserPlaylist';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUserAction } from '@/hooks/useUserAction';
import { MusicIcon } from '@/icons/MusicIcon';
import { useAuthStore } from '@/store/authStore';
import { createQueryParameter } from '@/utils/url';

import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';

interface MusicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

type ModalType = 'none' | 'login' | 'userPreference';

export const MusicLayout: React.FC<MusicLayoutProps> = ({ children, ...rest }) => {
  const router = useRouter();
  const { isMobile } = useIsMobile();

  const [modalType, setModalType] = useState<ModalType>('none');
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useAuthStore();
  const { queue, removeFromQueue } = usePlayerContext();
  const { handleUserAction, UserActionModalRenderer } = useUserAction();

  const { data: userPlaylist, isLoading: isUserPlaylistLoading } = useUserPlaylist();

  const handleLoginClick = useCallback(
    (type: LoginType) => {
      const params = {
        redirect: location.href,
      };
      router.push(`${location.origin}/api/auth/oauth/${type}?${createQueryParameter(params)}`);
    },
    [router],
  );

  const handleQueueAction = useCallback(
    (music: QueuedMusicInfo, action: QueueMusicAction) => {
      if (action.type === 'removeFromQueue') removeFromQueue([music.queueID]);
    },
    [removeFromQueue],
  );

  return (
    <div css={[tw`flex flex-col gap-2`, tw`w-full h-full p-2 lg:p-4`]}>
      <Card css={[tw`flex justify-between items-center`, tw`px-6 py-2`]}>
        <div css={[tw`flex gap-1 items-center justify-start`, tw`cursor-pointer`]}>
          <MusicIcon css={[tw`fill-gray-200 opacity-75`, tw`hidden lg:(w-9 h-9 block)`]} />
          <span css={[tw`font-bold text-xl`, tw`hidden lg:block`]} onClick={() => router.push('/')}>
            Music
          </span>
          <Button
            css={[tw`m-auto p-2 block lg:(hidden)`]}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <HiOutlineViewGrid />
          </Button>
        </div>
        <DesktopMusicPlayer />
        <MobileMusicPlayer />
        <div css={[tw`flex gap-2`]}>
          <PlayQueueList queue={queue} onQueueAction={handleQueueAction} />
          {!user && (
            <Button bgStyle css={[tw`py-2 text-sm`]} onClick={() => setModalType('login')}>
              로그인
            </Button>
          )}
          {user !== null && <UserActionMenu user={user} onClick={handleUserAction} />}
        </div>
      </Card>
      <Card
        css={[
          tw`flex flex-col lg:(flex-row) w-full flex-1 overflow-y-hidden`,
          tw`p-2 pb-16 lg:(pb-0 pr-0 p-8)`,
        ]}
      >
        <AppSidebar
          css={[tw`hidden lg:(flex)`, openSidebar && tw`flex`]}
          onClickItem={(value) => {
            router.push(value);
            setOpenSidebar(false);
          }}
          onSearch={(query) => router.push(`/search?q=${query}`)}
          userPlaylist={userPlaylist}
          isUserPlaylistLoading={isUserPlaylistLoading}
          router={router}
        />
        <div css={[tw`px-4 flex-1 overflow-x-hidden overflow-y-auto`]} {...rest}>
          {(!openSidebar || !isMobile) && (
            <div css={[tw`w-full h-full flex flex-col lg:(block)`]}>{children}</div>
          )}
        </div>
      </Card>

      {modalType === 'login' && (
        <LoginModal
          open={modalType === 'login'}
          onClose={() => setModalType('none')}
          onLoginClick={handleLoginClick}
        />
      )}
      <UserActionModalRenderer />
    </div>
  );
};
