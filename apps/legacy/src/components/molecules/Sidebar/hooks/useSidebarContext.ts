import { useContext } from 'react';

import { SidebarContext } from '../context';

const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (context === null) {
    throw new Error('Cannot get SidebarContext. Check component usage');
  }

  return context;
};

export default useSidebarContext;
