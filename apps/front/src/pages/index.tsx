import tw from 'twin.macro';

import { DynamicGradient } from '@/components/DynamicGradient';
import { DefaultLayout } from '@/components/Layout/DefaultLayout';
import { MusicLayout } from '@/components/Layout/MusicLayout';

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div
        // colors={['#313866', '#504099', '#974EC3']}
        css={[tw`w-full h-full`, tw`flex items-center justify-center`, tw`bg-zinc-800`]}
      >
        <MusicLayout css={[tw``]}>Home</MusicLayout>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
