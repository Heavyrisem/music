import React from 'react';
import tw from 'twin.macro';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      css={[
        tw`bg-gray-200 bg-opacity-10`,
        tw`border-2 rounded-md border-gray-200 border-opacity-20`,
        tw`outline-none focus:(border-2 border-gray-200 border-opacity-40)`,
      ]}
      {...props}
    />
  );
};
