import React from 'react';
import tw from 'twin.macro';

import { SidebarContextProvider, SidebarContextProviderProps } from '../context';

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SidebarContextProviderProps {}

export const SidebarComponent: React.FC<SidebarProps> = ({ children, onClickItem, ...rest }) => {
  return (
    <SidebarContextProvider onClickItem={onClickItem}>
      <div css={[tw`flex flex-col gap-2`]} {...rest}>
        {children}
      </div>
    </SidebarContextProvider>
  );
};
