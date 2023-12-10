import tw from 'twin.macro';

import { Image } from '@/components/atoms/Image';

interface PlayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description: string;
}

export const PlayCard: React.FC<PlayCardProps> = ({ imageUrl, title, description, ...rest }) => {
  return (
    <div css={[]} {...rest}>
      <Image src={imageUrl} width={100} height={100} alt="" css={[tw`w-48 h-48`]} />
      <div css={[tw`flex justify-between`]}>
        <div>
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <div>BTN</div>
      </div>
    </div>
  );
};
