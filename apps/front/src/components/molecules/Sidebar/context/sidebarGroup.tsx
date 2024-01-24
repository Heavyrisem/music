import React, { useContext } from 'react';

interface SidebarGroupContextState {
  depth: number;
}

export const SidebarGroupContextState = React.createContext<SidebarGroupContextState>({ depth: 0 });

export interface SidebarGroupContextProviderProps extends SidebarGroupContextState {
  children?: React.ReactNode;
}
export const SidebarGroupContextProvider: React.FC<SidebarGroupContextProviderProps> = ({
  children,
  ...rest
}) => {
  return (
    <SidebarGroupContextState.Provider value={rest}>{children}</SidebarGroupContextState.Provider>
  );
};

export const useSidebarGroupContext = () => {
  const context = useContext(SidebarGroupContextState);
  if (context === undefined) {
    throw new Error('useSidebarGroupContext must be used within a SidebarGroupContext');
  }
  return context;
};
