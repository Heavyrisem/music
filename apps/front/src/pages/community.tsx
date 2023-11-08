import tw from 'twin.macro';

import { DynamicGradient } from '@/components/DynamicGradient';
import { DefaultLayout } from '@/components/Layout/DefaultLayout';
import { MusicLayout } from '@/components/Layout/MusicLayout';

const Community: React.FC = () => {
  return (
    <DefaultLayout>
      <DynamicGradient
        colors={['#212129', '#323949', '#4c5265']}
        css={[tw`w-full h-full`, tw`flex items-center justify-center`]}
        speed={0.5}
      >
        <MusicLayout css={[tw``]}>Community</MusicLayout>
      </DynamicGradient>
    </DefaultLayout>
  );
};

export default Community;
