import React from 'react';
import tw from 'twin.macro';

import { Button, ButtonProps } from '../../Button';
import useSidebarContext from '../hooks/useSidebarContext';

export interface ItemProps extends ButtonProps {
  value: string;
  active?: boolean;
}

export const Item: React.FC<ItemProps> = ({ value, active, children, ...rest }) => {
  const { handleClickSidebarItem } = useSidebarContext();
  return (
    <Button
      onClick={() => handleClickSidebarItem(value)}
      css={[
        tw`w-full px-5 py-2`,
        tw`font-bold text-start text-sm`,
        active && tw`bg-gray-200 bg-opacity-20 hover:(bg-gray-200 bg-opacity-20)`,
      ]}
      {...rest}
    >
      {children}
    </Button>
  );
};
