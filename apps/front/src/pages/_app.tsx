import type { AppProps } from 'next/app';
import tw from 'twin.macro';

import { DefaultLayout } from '@/components/Layout/DefaultLayout';
import { DynamicGradient } from '@/components/atoms/DynamicGradient';
import { useBgColorStore } from '@/store/bgColorStore';
import { useTheme } from '@/store/themeStore';
import '@/styles/globals.css';
import { darkenHexColor } from '@/utils/color';

export default function App({ Component, pageProps }: AppProps) {
  const { gradation, colors } = useBgColorStore();
  const { theme } = useTheme();

  return (
    <DefaultLayout>
      {gradation && (
        <DynamicGradient
          colors={colors.map((color) => (theme === 'light' ? color : darkenHexColor(color, 80)))}
          css={[tw`w-full h-full`, tw`flex items-center justify-center`]}
          speed={1}
        >
          <Component {...pageProps} />
        </DynamicGradient>
      )}

      {!gradation && (
        <div css={[tw`w-full h-full`, tw`flex items-center justify-center`, tw`bg-zinc-800`]}>
          <Component {...pageProps} />
        </div>
      )}
    </DefaultLayout>
  );
}
