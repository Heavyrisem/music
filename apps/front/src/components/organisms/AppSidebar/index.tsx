import { FireIcon, HomeIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { Model } from '@music/types';
import router, { NextRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import tw from 'twin.macro';

import { Input } from '@/components/atoms/Input';
import { Sidebar } from '@/components/molecules/Sidebar';
import { SidebarProps } from '@/components/molecules/Sidebar/components/Sidebar';
import { SearchIcon } from '@/icons/SearchIcon';

interface AppSidebarProps extends SidebarProps {
  router?: NextRouter;
  userPlaylist?: Model.PlaylistInfo[];
  isUserPlaylistLoading?: boolean;
  onSearch?: (keyword: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  router,
  userPlaylist,
  isUserPlaylistLoading = false,
  onSearch,
  ...rest
}) => {
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

      onSearch?.(searchInput);
    },
    [onSearch, searchInput],
  );

  return (
    <Sidebar
      {...rest}
      css={[tw`gap-8`, tw`lg:(static w-60 pr-4 border-r-2 border-gray-200 border-opacity-10)`]}
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
            active={value === router?.pathname}
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
              active={`/playlist/${id.toString()}` === router?.asPath}
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
  );
};
