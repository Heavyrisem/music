import { useEffect } from 'react';

import { Button } from '@/components/Button';
import { Popover } from '@/components/Popover';
import { PopoverContext, PopoverProviderProps } from '@/components/Popover/context';

import { SelectContextProvider, SelectContextProviderProps } from '../context';

interface RootProps extends SelectContextProviderProps, PopoverProviderProps {}

export const Root: React.FC<RootProps> = ({ children, open, anchorEl, ...rest }) => {
  return (
    <Popover.Root open={open} anchorEl={anchorEl}>
      <SelectContextProvider {...rest}>{children}</SelectContextProvider>
    </Popover.Root>
  );
};
