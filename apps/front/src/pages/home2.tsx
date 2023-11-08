import tw from 'twin.macro';

import { DefaultLayout } from '@/components/Layout/DefaultLayout';
import { MusicLayout } from '@/components/Layout/MusicLayout';
import GradientCanvas from '@/components/LegacyGradientCanvas';

const HomePage: React.FC = () => {
  return (
    <DefaultLayout css={[tw`flex items-center justify-center`]}>
      <GradientCanvas
        css={[tw`absolute -z-10`]}
        colors={[
          { r: 61, g: 48, b: 162 },
          { r: 177, g: 94, b: 255 },
          { r: 255, g: 163, b: 60 },
          { r: 255, g: 251, b: 115 },
        ]}
        fps={60}
        speed={0.5}
        particleNumber={20}
      ></GradientCanvas>
      <MusicLayout css={[tw``]}>Home2</MusicLayout>
    </DefaultLayout>
  );
};

export default HomePage;
