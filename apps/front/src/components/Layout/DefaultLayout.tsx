import { Noto_Sans_KR } from 'next/font/google';
import React from 'react';
import tw from 'twin.macro';

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });

interface DefaultLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  return (
    <div
      css={[
        tw`w-screen h-screen`,
        tw`text-gray-200 text-opacity-75 selection:(bg-gray-200 bg-opacity-30)`,
      ]}
      className={notoSansKR.className}
      {...props}
    />
  );
};
