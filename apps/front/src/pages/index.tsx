import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/molecules/Modal';
import { PlayCard } from '@/components/organisms/PlayCard';
import { useUserPlayHistory } from '@/hooks/api/useUserPlayHistory';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { data: userPlayHistory } = useUserPlayHistory({ maxCount: 20 });

  return (
    <MusicLayout css={[tw`flex flex-col gap-4`]}>
      <div css={[tw`text-2xl font-bold`, tw`text-gray-200 text-opacity-60`]}>홈</div>
      최근 활동에 기반한 내용을 보여줍니다.
      <div css={[tw`flex-1 flex flex-col gap-6`]}>
        <div css={[tw`overflow-y-hidden`]}>
          <div>최근 재생한 음악</div>
          <div css={[tw`flex gap-8`]}>
            {userPlayHistory?.map((item) => (
              <PlayCard
                key={item.youtubeId}
                title={item.title}
                description={item.artist.join(' ')}
                imageUrl={item.thumbnailUrl}
              />
            ))}
          </div>
        </div>
        <div>내 플레이리스트</div>
      </div>
      <Button onClick={() => setOpen(true)}>열기</Button>
    </MusicLayout>
  );
};

export default HomePage;
