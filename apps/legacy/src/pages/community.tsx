import { useCallback, useState } from 'react';
import tw from 'twin.macro';

import { DefaultLayout } from '@/Layout/DefaultLayout';
import { MusicLayout } from '@/Layout/Music';
import { Button } from '@/components/atoms/Button';
import { DynamicGradient } from '@/components/atoms/DynamicGradient';
import { useTheme } from '@/store/themeStore';
import { darkenHexColor } from '@/utils/color';

const Community: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleClickButton = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <MusicLayout css={[tw``]}>
      Community
      <Button onClick={handleClickButton}>Change</Button>
    </MusicLayout>
  );
};

export default Community;
