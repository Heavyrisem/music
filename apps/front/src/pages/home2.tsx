import { useEffect } from 'react';
import tw from 'twin.macro';

import { DefaultLayout } from '@/components/Layout/DefaultLayout';
import { MusicLayout } from '@/components/Layout/MusicLayout';
import GradientCanvas from '@/components/LegacyGradientCanvas';
import { useBgColorStore } from '@/store/bgColorStore';

const HomePage: React.FC = () => {
  const { setGradation } = useBgColorStore();

  useEffect(() => {
    setGradation(true);

    return () => {
      setGradation(false);
    };
  }, [setGradation]);
  return <MusicLayout css={[tw``]}>Home2</MusicLayout>;
};

export default HomePage;
