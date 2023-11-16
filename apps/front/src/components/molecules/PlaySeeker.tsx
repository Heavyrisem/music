import tw from 'twin.macro';

import { AudioData } from '@/store/playerStore';

interface PlaySeekerProps extends React.HTMLAttributes<HTMLDivElement> {
  audioData?: AudioData;
  progress?: number;
  onSeek?: (duration: number) => void;
}

export const PlaySeeker: React.FC<PlaySeekerProps> = ({ progress, onSeek }) => {
  return <div css={[tw``]} {...rest}></div>;
};
