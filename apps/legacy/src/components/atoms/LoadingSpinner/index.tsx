import React from 'react';
import tw from 'twin.macro';

import { SpinnerIcon } from '@/icons/SpinnerIcon';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoadingSpinner = ({ ...rest }: LoadingSpinnerProps) => {
  return (
    <div css={[tw`animate-spin`]} {...rest}>
      <SpinnerIcon css={[tw`w-full h-full`]} />
    </div>
  );
};
