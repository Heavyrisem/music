import React from 'react';
import tw from 'twin.macro';

import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';

interface TableLoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TableLoadingSpinner = (props: TableLoadingSpinnerProps) => {
  return (
    <div css={[tw`w-full h-full`, tw`flex justify-center items-center`]} {...props}>
      <LoadingSpinner />
    </div>
  );
};
