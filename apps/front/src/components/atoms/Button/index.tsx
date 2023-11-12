import React from 'react';
import tw from 'twin.macro';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  border?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ border, ...props }) => {
  return (
    <button
      css={[
        tw`px-4 py-1`,
        tw`hover:(bg-gray-200 bg-opacity-5) focus:focus-visible:(outline-none bg-gray-200 bg-opacity-20)`,
        tw`transition-colors`,
        tw`rounded-lg`,
        border && tw`border-2 border-gray-200 border-opacity-20`,
      ]}
      {...props}
    />
  );
};
