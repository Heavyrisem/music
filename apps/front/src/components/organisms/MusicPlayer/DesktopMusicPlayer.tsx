import { useCallback } from 'react';
import tw from 'twin.macro';

import { usePlayerContext } from '@/context/PlayerContext';
import { MusicIcon } from '@/icons/MusicIcon';

import { Image } from '../../atoms/Image';
import { SliderInput } from '../../atoms/SliderInput';
import { PlayController } from '../../molecules/PlayController';

export const DesktopMusicPlayer: React.FC = () => {
  const { musicInfo, paused, volume, progress, setVolume, setProgress, setPaused, skipMusic } =
    usePlayerContext();

  const handlePlayStateChange = useCallback(
    (playing: boolean) => {
      if (playing) setPaused(false);
      else setPaused(true);
    },
    [setPaused],
  );

  return (
    <div css={[tw`hidden lg:flex`, tw`w-full justify-center items-center gap-32`]}>
      <PlayController
        css={[tw`w-24`]}
        playing={musicInfo !== null && !paused}
        onStateChange={handlePlayStateChange}
        onNext={skipMusic}
      />
      <div
        css={[
          tw`flex-1 max-w-[40rem] h-[3rem] bg-gray-200 bg-opacity-10 overflow-hidden`,
          tw`rounded-md`,
        ]}
      >
        {!musicInfo && (
          <div css={[tw`w-full h-full flex justify-center items-center`]}>
            <MusicIcon css={[tw`w-8 h-8 fill-gray-200 opacity-75`]} />
          </div>
        )}
        {musicInfo && (
          <div css={[tw`w-full h-full flex`]}>
            <Image
              src={musicInfo.thumbnailUrl}
              alt=""
              width={48}
              height={48}
              css={[tw`rounded-none border-none`, tw`hidden lg:block`]}
            />
            <div css={[tw`flex flex-col flex-1 items-center justify-between pt-1`, tw`text-xs`]}>
              <div>{musicInfo.title}</div>
              <div>
                {musicInfo.artist} - {musicInfo.album}
              </div>
              <SliderInput
                css={[tw`mb-0`]}
                value={progress}
                onDebounceChange={setProgress}
                min={0}
                max={musicInfo.duration}
                debounceDelayMils={10}
              />
            </div>
          </div>
        )}
      </div>
      <div css={[tw`w-24 flex items-center`]}>
        <SliderInput
          value={volume}
          onDebounceChange={setVolume}
          min={0}
          max={100}
          debounceDelayMils={50}
          cursorType="circle"
          showCursor
        />
      </div>
    </div>
  );
};
