import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import tw from 'twin.macro';

import { MusicIcon } from '@/icons/MusicIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { usePlayerStore } from '@/store/playerStore';

import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { Input } from '../components/atoms/Input';
import { PlayController } from '../components/molecules/PlayController';
import { Sidebar } from '../components/molecules/Sidebar';
import { SliderInput } from '../components/molecules/SliderInput';

interface MusicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const MusicPlayer: React.FC = () => {
  const { playing, volume, setProgress, setVolume, setPaused, setPlaying } = usePlayerStore();

  const handlePlayStateChange = useCallback(
    (playing: boolean) => {
      console.log(playing);
      setPaused(!playing);
    },
    [setPaused],
  );

  return (
    <div css={[tw`flex justify-between items-center gap-[8rem]`]}>
      <PlayController
        css={[tw`w-24`]}
        playing={!playing?.paused}
        onStateChange={handlePlayStateChange}
      />
      <div css={[tw`w-[34rem] h-[3rem] bg-gray-200 bg-opacity-10 overflow-hidden`, tw`rounded-md`]}>
        {!playing && (
          <div css={[tw`w-full h-full flex justify-center items-center`]}>
            <MusicIcon css={[tw`w-8 h-8 fill-gray-200 opacity-75`]} />
          </div>
        )}
        {playing && (
          <div css={[tw`w-full h-full flex`]}>
            <Image src={playing.audioData.thumbnailURL} alt="" width={48} height={48} />
            <div css={[tw`flex flex-col flex-1 items-center justify-between pt-1`, tw`text-xs`]}>
              <div>{playing.audioData.title}</div>
              <div>
                {playing.audioData.artist} - {playing.audioData.album}
              </div>
              <SliderInput
                css={[tw`mb-0`]}
                value={playing.progress}
                onChange={(v) => setProgress(v)}
                min={0}
                max={playing.audioData.duration}
              />
            </div>
          </div>
        )}
      </div>
      <div css={[tw`w-24 flex items-center`]}>
        <SliderInput
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          cursorType="circle"
          showCursor
        />
      </div>
    </div>
  );
};

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
      <Card css={[tw`flex justify-between items-center`, tw`px-6 py-2`]}>
        <div css={[tw`flex gap-1 items-center justify-start`]}>
          <MusicIcon css={[tw`w-9 h-9 fill-gray-200 opacity-75`]} />
          <span css={[tw`font-bold text-xl`]}>Music</span>
        </div>
        <MusicPlayer />
        <div>
          <Button css={[tw`py-2 text-sm`]}>로그인</Button>
        </div>
      </Card>
      <Card css={[tw`flex w-full h-[50rem] overflow-y-hidden`, tw`p-8 pr-0`]}>
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
            {sidebarMenu.map(({ value, label }) => (
              <Sidebar.Item key={value} value={value} active={value === router.pathname}>
                {label}
              </Sidebar.Item>
            ))}
          </div>
        </Sidebar>
        <div css={[tw`px-4 flex-1`]} {...rest}>
          {children}
        </div>
      </Card>
    </div>
  );
};
