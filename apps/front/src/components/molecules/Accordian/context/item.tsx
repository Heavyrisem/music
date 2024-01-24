import React from 'react';

import { useControlled } from '@/hooks/useControlled';

interface AccordianItemContextState {
  id: string;
}

export const AccordianItemContext = React.createContext<AccordianItemContextState>({
  id: '',
});

export interface AccordianItemContextProviderProps extends Pick<AccordianItemContextState, 'id'> {
  children?: React.ReactNode;
}
export const AccordianItemContextProvider: React.FC<AccordianItemContextProviderProps> = ({
  id,
  children,
}) => {
  return <AccordianItemContext.Provider value={{ id }}>{children}</AccordianItemContext.Provider>;
};

export const useAccordianItemContext = () => {
  const context = React.useContext(AccordianItemContext);
  if (context === undefined) {
    throw new Error('useAccordianItemContext must be used within a AccordianItemContextProvider');
  }
  return context;
};
