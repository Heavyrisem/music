import React, { useCallback } from 'react';

import { useControlled } from '@/hooks/useControlled';

interface AccordianContextState {
  opened?: string;
  handleOpen: (id: string) => void;
}

export const AccordianContext = React.createContext<AccordianContextState>({
  opened: undefined,
  handleOpen: () => {},
});

export interface AccordianContextProviderProps
  extends Partial<Pick<AccordianContextState, 'opened'>> {
  defaultOpened?: string;
  onOpen?: (id?: string) => void;
  children?: React.ReactNode;
}
export const AccordianContextProvider: React.FC<AccordianContextProviderProps> = ({
  opened: openedProp,
  defaultOpened,
  children,
  onOpen,
}) => {
  const [opened, setOpened] = useControlled(defaultOpened, openedProp);

  const handleOpen = useCallback<AccordianContextState['handleOpen']>(
    (id) => {
      let newOpened;
      if (opened === id) {
        newOpened = undefined;
      } else {
        newOpened = id;
      }

      onOpen?.(newOpened);
      setOpened(newOpened);
    },
    [onOpen, opened, setOpened],
  );

  return (
    <AccordianContext.Provider value={{ opened, handleOpen }}>{children}</AccordianContext.Provider>
  );
};

export const useAccordianContext = () => {
  const context = React.useContext(AccordianContext);
  if (context === undefined) {
    throw new Error('useAccordianContext must be used within a AccordianContextProvider');
  }
  return context;
};
