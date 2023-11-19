import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import tw from 'twin.macro';

import { MusicLayout } from '@/Layout/Music';
import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/organisms/Modal';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <MusicLayout css={[tw`flex flex-col gap-4`]}>
      <div css={[tw`text-2xl font-bold`, tw`text-gray-200 text-opacity-60`]}>홈</div>
      최근 활동에 기반한 내용을 보여줍니다.
      <div css={[tw`flex-1 flex flex-col gap-6`]}>
        <div>최근 재생한 음악</div>
        <div>내 플레이리스트</div>
      </div>
      <Button onClick={() => setOpen(true)}>열기</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div css={[tw`font-bold`, tw`flex justify-center items-center`, tw`w-96`]}>
          플레이리스트 편집
        </div>
        <div css={[tw`flex justify-between items-center gap-2`]}>
          <Modal.CloseButton css={[tw`p-0`]} hoverStyle={false}>
            <XMarkIcon css={[tw`h-4 w-4`]} />
          </Modal.CloseButton>
          <Button bgStyle>확인</Button>
        </div>
      </Modal>
    </MusicLayout>
  );
};

export default HomePage;
