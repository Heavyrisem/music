import { FireIcon, HomeIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import tw from 'twin.macro';

import { getUserPlaylist } from '@/api/playlist';
import { LoginModal, LoginType } from '@/components/templates/LoginModal';
import { UserPreferenceEditModal } from '@/components/templates/UserPreferenceEditModal';
import { useEditUserPreferenceMutation } from '@/hooks/api/useEditUserPreferenceMutation';
import { useUserPlaylist } from '@/hooks/api/useUserPlaylist';
import { MusicIcon } from '@/icons/MusicIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { useAuthStore } from '@/store/authStore';
import { createQueryParameter } from '@/utils/url';

import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { Input } from '../../components/atoms/Input';
import { Sidebar } from '../../components/organisms/Sidebar';
import { MusicPlayer } from './MusicPlayer';

interface MusicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

type ModalType = 'none' | 'login' | 'userPreference';

export const MusicLayout: React.FC<MusicLayoutProps> = ({ children, ...rest }) => {
  const router = useRouter();

  const [modalType, setModalType] = useState<ModalType>('none');
  const [searchInput, setSearchInput] = useState<string>();

  const { user } = useAuthStore();
  const { data: userPlaylist } = useUserPlaylist();
  const { mutate: editUserPreferenceMutation } = useEditUserPreferenceMutation({
    onSuccess: () => setModalType('none'),
  });

  const sidebarMenu = useMemo(() => {
    return [
      { value: '/', label: 'Home', icon: <HomeIcon /> },
      { value: '/community', label: 'Community', icon: <FireIcon /> },
    ];
  }, []);

  const handleSearchKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (!searchInput) return;
      if (e.key !== 'Enter') return;

      router.push(`/search?q=${searchInput}`);
    },
    [router, searchInput],
  );

  const handleLoginClick = useCallback(
    (type: LoginType) => {
      const params = {
        redirect: location.origin,
      };
      router.push(`${location.origin}/api/auth/oauth/${type}?${createQueryParameter(params)}`);
    },
    [router],
  );

  return (
    <div css={[tw`flex flex-col gap-2`, tw`w-full h-full`]}>
      <Card css={[tw`flex justify-between items-center`, tw`px-6 py-2`]}>
        <div
          css={[tw`flex gap-1 items-center justify-start`, tw`cursor-pointer`]}
          onClick={() => router.push('/')}
        >
          <MusicIcon css={[tw`w-9 h-9 fill-gray-200 opacity-75`]} />
          <span css={[tw`font-bold text-xl`]}>Music</span>
        </div>
        <MusicPlayer />
        <div>
          {!user && (
            <Button bgStyle css={[tw`py-2 text-sm`]} onClick={() => setModalType('login')}>
              로그인
            </Button>
          )}

          {user !== null && (
            <Button bgStyle css={[tw`py-2 text-sm`]} onClick={() => setModalType('userPreference')}>
              {user.displayName}
            </Button>
          )}
        </div>
      </Card>
      <Card css={[tw`flex w-full flex-1 overflow-y-hidden`, tw`p-8 pr-0`]}>
        <Sidebar
          css={[tw`gap-8`, tw`w-60 pr-4 border-r-2 border-gray-200 border-opacity-10`]}
          onClickItem={(value) => router.push(value)}
        >
          <div>
            <Input
              css={[tw`w-fit px-2 py-1`, tw`text-sm`]}
              icon={<SearchIcon width={18} height={18} />}
              onKeyDown={handleSearchKeyDown}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="검색"
              autoComplete="off"
            />
          </div>
          <div css={[tw`flex flex-col gap-1`]}>
            <div css={[tw`text-xs font-bold text-gray-200 text-opacity-40`]}>탐색</div>
            {sidebarMenu.map(({ value, label, icon }) => (
              <Sidebar.Item
                key={value}
                value={value}
                active={value === router.pathname}
                css={[tw`flex gap-2 items-center`]}
              >
                <span css={[tw`w-4 h-4`]}>{icon}</span>
                {label}
              </Sidebar.Item>
            ))}
          </div>
          {userPlaylist && (
            <div css={[tw`flex flex-col gap-1`]}>
              <div css={[tw`text-xs font-bold text-gray-200 text-opacity-40`]}>플레이리스트</div>
              {userPlaylist.map(({ id, name }) => (
                <Sidebar.Item
                  key={id}
                  value={`/playlist/${id.toString()}`}
                  active={`/playlist/${id.toString()}` === router.asPath}
                  css={[tw`flex gap-2 items-center`]}
                >
                  <span css={[tw`w-4 h-4`]}>
                    <ListBulletIcon />
                  </span>
                  {name}
                </Sidebar.Item>
              ))}
            </div>
          )}
        </Sidebar>
        <div css={[tw`px-4 flex-1`]} {...rest}>
          {children}
        </div>
      </Card>

      {modalType === 'login' && (
        <LoginModal
          open={modalType === 'login'}
          onClose={() => setModalType('none')}
          onLoginClick={handleLoginClick}
        />
      )}
      {modalType === 'userPreference' && user && (
        <UserPreferenceEditModal
          open={modalType === 'userPreference'}
          userPreference={user}
          onSubmit={editUserPreferenceMutation}
          onClose={() => setModalType('none')}
        />
      )}
    </div>
  );
};
