import React from 'react';
import tw from 'twin.macro';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      css={[
        tw`p-4`,
        tw`border-2 border-gray-200 border-opacity-20 rounded-lg`,
        tw`bg-gray-200 bg-opacity-5`,
      ]}
      {...props}
    />
  );
};
