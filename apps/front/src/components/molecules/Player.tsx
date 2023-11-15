import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  PlayPauseIcon,
} from '@heroicons/react/24/solid';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  playing?: boolean;
  onStateChange?: (playing: boolean) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const iconStyle = [tw`h-6 w-6`];
const buttonStyle = [tw`p-1`];

export const Player: React.FC<PlayerProps> = ({
  playing = false,
  onStateChange,
  onNext,
  onPrev,
  ...rest
}) => {
  const [isPlaying, setPlaying] = useState(playing);

  const handleTogglePlay = useCallback(() => {
    setPlaying(!isPlaying);
    onStateChange?.(isPlaying);
  }, [isPlaying, onStateChange]);

  return (
    <div css={[tw`flex justify-between items-center`]} {...rest}>
      <Button css={[buttonStyle]}>
        <BackwardIcon css={[iconStyle]} />
      </Button>

      <Button css={[buttonStyle]}>
        {isPlaying ? (
          <PauseIcon css={[iconStyle]} onClick={handleTogglePlay} />
        ) : (
          <PlayIcon css={[iconStyle]} onClick={handleTogglePlay} />
        )}
      </Button>

      <Button css={[buttonStyle]}>
        <ForwardIcon css={[iconStyle]} />
      </Button>
    </div>
  );
};
