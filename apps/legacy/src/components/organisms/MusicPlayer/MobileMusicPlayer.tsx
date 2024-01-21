import { useCallback } from 'react';
import tw from 'twin.macro';

import { Image } from '@/components/atoms/Image';
import { SliderInput } from '@/components/atoms/SliderInput';
import { PlayController } from '@/components/molecules/PlayController';
import { usePlayerContext } from '@/context/PlayerContext';
import { MusicIcon } from '@/icons/MusicIcon';
import { textStyle } from '@/styles/global';

export const MobileMusicPlayer: React.FC = () => {
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
    <div css={[tw`block lg:hidden`, tw`absolute left-0 bottom-0 w-full z-30 backdrop-blur-sm`]}>
      <div css={[tw`flex m-2 mt-0 p-2 bg-gray-200 bg-opacity-10 rounded-xl overflow-hidden`]}>
        {!musicInfo && (
          <div css={[tw`w-full h-full flex`]}>
            <MusicIcon css={[tw`w-8 h-8 fill-gray-200 opacity-75`]} />
          </div>
        )}
        {musicInfo && (
          <div css={[tw`w-full h-full flex items-center justify-start gap-2`]}>
            <Image
              src={musicInfo.thumbnailUrl}
              alt=""
              width={32}
              height={32}
              css={[tw`w-10 h-10 rounded-md border-none`, tw`block lg:hidden`]}
            />
            <div css={[textStyle, tw`text-sm`]}>{musicInfo.title}</div>
          </div>
        )}
        <PlayController
          css={[tw`w-24`]}
          playing={musicInfo !== null && !paused}
          onStateChange={handlePlayStateChange}
          onNext={skipMusic}
        />
      </div>
    </div>
  );
};
