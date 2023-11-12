import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import tw from 'twin.macro';

import { MusicIcon } from '@/icons/MusicIcon';
import { SearchIcon } from '@/icons/SearchIcon';

import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Input } from '../atoms/Input';
import { Sidebar } from '../molecules/Sidebar';

interface MusicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MusicLayout: React.FC<MusicLayoutProps> = ({ children, ...rest }) => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState<string>();

  const sidebarMenu = useMemo(() => {
    return [
      { value: '/', label: 'Home' },
      { value: '/home2', label: 'Home2' },
      { value: '/community', label: 'Community' },
      { value: '/test2', label: 'Test2' },
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
    <div css={[tw`flex flex-col gap-2`, tw`w-[80%] `]}>
      <Card css={[tw`flex justify-between items-center`, tw`px-6`]}>
        <div css={[tw`flex gap-1 items-center justify-start`]}>
          <MusicIcon css={[tw`w-9 h-9 fill-gray-200 opacity-75`]} />
          <span css={[tw`font-bold text-xl`]}>Music</span>
        </div>
        <div>
          <Button css={[tw`py-2 text-sm`]}>Login</Button>
        </div>
      </Card>
      <Card css={[tw`flex w-full min-h-[50rem]`, tw`p-8`]}>
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
          <div css={[tw`flex flex-col gap-2`]}>
            {sidebarMenu.map(({ value, label }) => (
              <Sidebar.Item key={value} value={value} active={value === router.pathname}>
                {label}
              </Sidebar.Item>
            ))}
            {/* <Sidebar.Item value="/" active={router.pathname === '/'}>
              Home
            </Sidebar.Item>
            <Sidebar.Item value="/community" active={router.pathname === '/community'}>
              Community
            </Sidebar.Item> */}
          </div>
        </Sidebar>
        <div css={[tw`px-4`]} {...rest}>
          {children}
        </div>
      </Card>
    </div>
  );
};
