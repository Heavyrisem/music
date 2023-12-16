import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/molecules/Modal';
import { MusicActionMenu } from '@/components/organisms/ActionMenu/MusicActionMenu';
import { PlaylistActionMenu } from '@/components/organisms/ActionMenu/PlaylistActionMenu';
import { PlayCard } from '@/components/organisms/PlayCard';
import { useTopPlayedMusic } from '@/hooks/api/useTopPlayedMusic';
import { useUserPlayHistory } from '@/hooks/api/useUserPlayHistory';
import { useUserPlaylist } from '@/hooks/api/useUserPlaylist';
import { useMusicAction } from '@/hooks/useMusicAction';
import { useAuthStore } from '@/store/authStore';
import { scrollHidden } from '@/styles/scroll';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { user } = useAuthStore();
  const { data: userPlayHistory } = useUserPlayHistory({ maxCount: 20 });
  const { data: userPlaylist } = useUserPlaylist();
  const { data: topPlayedMusic } = useTopPlayedMusic({});

  const { musicActionHandler, MusicActionModalRenderer } = useMusicAction();

  return (
    <MusicLayout css={[tw`flex flex-col gap-4`]}>
      <div css={[tw`flex-1 flex flex-col gap-6`]}>
        <div css={[tw`text-2xl font-bold`, tw`text-gray-200 text-opacity-60`]}>홈</div>
        <div>가장 많이 재생된 음악</div>
        <div css={[tw`flex gap-8 w-full overflow-y-scroll`]}>
          {topPlayedMusic?.map((item) => (
            <PlayCard
              key={item.youtubeId}
              title={`${item.title} - ${item.album}`}
              description={item.artist.join(' ')}
              imageUrl={item.thumbnailUrl.replaceAll('120', '256')}
              actionButton={
                <MusicActionMenu
                  playlist={userPlaylist}
                  onClick={(action) => musicActionHandler(item, action)}
                />
              }
            />
          ))}
        </div>
        {user ? (
          <>
            <div>최근 재생한 음악</div>
            <div css={[tw`flex gap-8 w-full overflow-y-scroll`]}>
              {userPlayHistory?.map((item) => (
                <PlayCard
                  key={item.youtubeId}
                  title={`${item.title} - ${item.album}`}
                  description={item.artist.join(' ')}
                  imageUrl={item.thumbnailUrl.replaceAll('120', '256')}
                  actionButton={
                    <MusicActionMenu
                      playlist={userPlaylist}
                      onClick={(action) => musicActionHandler(item, action)}
                    />
                  }
                />
              ))}
            </div>
            <div>내 플레이리스트</div>
            <div css={[tw`flex gap-8 w-full overflow-y-scroll`]}>
              {userPlaylist?.map((playlist) => (
                <PlayCard
                  key={playlist.id}
                  title={`${playlist.name}`}
                  description={playlist.description}
                  imageUrl={playlist.thumbnail}
                  actionButton={<PlaylistActionMenu />}
                  unoptimized
                />
              ))}
            </div>
          </>
        ) : (
          <div css={[tw`w-full flex-1`, tw`flex items-center justify-center`]}></div>
        )}
      </div>
      <MusicActionModalRenderer />
    </MusicLayout>
  );
};

export default HomePage;
