import React from 'react';
import tw from 'twin.macro';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  border?: boolean;
  hover?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ border, hover = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        css={[
          tw`px-4 py-1`,
          tw`transition-colors`,
          tw`rounded-lg`,
          tw`focus:focus-visible:(outline-none bg-gray-200 bg-opacity-20)`,
          hover && tw`hover:(bg-gray-200 bg-opacity-5)`,
          border && tw`border-2 border-gray-200 border-opacity-20`,
        ]}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
