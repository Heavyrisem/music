import React from 'react';
import tw from 'twin.macro';

interface DefaultLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  return <div css={[tw`w-screen h-screen`, tw`text-gray-200 text-opacity-75`]} {...props} />;
};
