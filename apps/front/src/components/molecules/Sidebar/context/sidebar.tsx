import path from 'path';
import React, { useCallback } from 'react';

import { useControlled } from '@/hooks/useControlled';

interface SidebarContextState {
  activePath?: string;
  handleClickItem: (path: string) => void;
}

export const SidebarContext = React.createContext<SidebarContextState>({
  activePath: undefined,
  handleClickItem: () => {},
});

export interface SidebarContextProviderProps
  extends Partial<Pick<SidebarContextState, 'activePath'>> {
  onClick?: (path: string) => void;
  children: React.ReactNode;
}
export const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({
  activePath: activePathProp,
  children,
  onClick,
}) => {
  const [activePath, setActivePath] = useControlled(undefined, activePathProp);

  const handleClickItem = useCallback<SidebarContextState['handleClickItem']>((path) => {
    let newActivePath;
    if (path === activePath) {
      newActivePath = undefined;
    } else {
      newActivePath = path;
    }

    setActivePath(newActivePath);
    onClick?.(newActivePath);
  }, []);

  return (
    <SidebarContext.Provider value={{ activePath, handleClickItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarContext');
  }
  return context;
};
