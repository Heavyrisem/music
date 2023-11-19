import { FireIcon, HomeIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import tw from 'twin.macro';

import { getUserPlaylist } from '@/api/music';
import { MusicIcon } from '@/icons/MusicIcon';
import { SearchIcon } from '@/icons/SearchIcon';

import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { Input } from '../../components/atoms/Input';
import { Sidebar } from '../../components/organisms/Sidebar';
import { MusicPlayer } from './MusicPlayer';

interface MusicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MusicLayout: React.FC<MusicLayoutProps> = ({ children, ...rest }) => {
  const router = useRouter();

  const { data: userPlaylist } = useQuery({
    queryKey: [getUserPlaylist.name],
    queryFn: () => getUserPlaylist(),
  });

  const [searchInput, setSearchInput] = useState<string>();

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
          <Button bgStyle css={[tw`py-2 text-sm`]}>
            로그인
          </Button>
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
    </div>
  );
};
