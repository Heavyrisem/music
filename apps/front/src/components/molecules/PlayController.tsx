import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import React, { useCallback } from 'react';
import tw from 'twin.macro';

import { useControlled } from '@/hooks/useControlled';

import { Button } from '../atoms/Button';

interface PlayController extends React.HTMLAttributes<HTMLDivElement> {
  playing?: boolean;
  defaultPlaying?: boolean;
  onStateChange?: (playing: boolean) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const iconStyle = [tw`h-6 w-6`];
const buttonStyle = [tw`p-1`];

export const PlayController: React.FC<PlayController> = ({
  playing,
  defaultPlaying = false,
  onStateChange,
  onNext,
  onPrev,
  ...rest
}) => {
  const [isPlaying, setPlaying] = useControlled({ value: playing, defaultValue: defaultPlaying });

  const handleTogglePlay = useCallback(() => {
    setPlaying(!isPlaying);
    onStateChange?.(!isPlaying);
  }, [isPlaying, onStateChange, setPlaying]);

  return (
    <div css={[tw`flex justify-between items-center`]} {...rest}>
      <Button css={[buttonStyle]}>
        <BackwardIcon css={[iconStyle]} onClick={() => onPrev?.()} />
      </Button>

      <Button css={[buttonStyle]}>
        {isPlaying ? (
          <PauseIcon css={[iconStyle]} onClick={handleTogglePlay} />
        ) : (
          <PlayIcon css={[iconStyle]} onClick={handleTogglePlay} />
        )}
      </Button>

      <Button css={[buttonStyle]}>
        <ForwardIcon css={[iconStyle]} onClick={() => onNext?.()} />
      </Button>
    </div>
  );
};
