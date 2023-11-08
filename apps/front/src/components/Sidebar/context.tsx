import React, { PropsWithChildren, useCallback } from 'react';

export interface SidebarContextState {
  handleClickSidebarItem: (value: string) => void;
}

const initalValue: SidebarContextState = {
  handleClickSidebarItem: () => {},
};

export const SidebarContext = React.createContext<SidebarContextState>(initalValue);

export interface SidebarContextProviderProps extends PropsWithChildren {
  onClickItem?: SidebarContextState['handleClickSidebarItem'];
}

export const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({
  onClickItem,
  children,
}) => {
  const handleClickSidebarItem = useCallback<SidebarContextState['handleClickSidebarItem']>(
    (value) => {
      onClickItem?.(value);
    },
    [onClickItem],
  );

  return (
    <SidebarContext.Provider value={{ handleClickSidebarItem }}>
      {children}{' '}
    </SidebarContext.Provider>
  );
};
