import React from 'react';
import tw from 'twin.macro';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  bgStyle?: boolean;
  borderStyle?: boolean;
  hoverStyle?: boolean;
  focusStyle?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { bgStyle = false, borderStyle = false, hoverStyle = true, focusStyle = true, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        css={[
          tw`px-4 py-1`,
          tw`transition-colors`,
          tw`rounded-lg`,
          bgStyle && tw`bg-gray-200 bg-opacity-10`,
          focusStyle && tw`focus:focus-visible:(outline-none bg-gray-200 bg-opacity-20)`,
          hoverStyle && tw`hover:(bg-gray-200 bg-opacity-5)`,
          borderStyle && tw`border-2 border-gray-200 border-opacity-20`,
        ]}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
