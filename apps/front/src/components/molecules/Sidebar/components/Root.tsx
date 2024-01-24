import { SidebarContextProvider, SidebarContextProviderProps } from '../context/sidebar';
import { SidebarGroupContextProvider } from '../context/sidebarGroup';

export interface RootProps extends SidebarContextProviderProps {}

export const Root: React.FC<RootProps> = ({ children, ...rest }) => {
  return (
    <SidebarContextProvider {...rest}>
      <SidebarGroupContextProvider depth={0}>{children}</SidebarGroupContextProvider>
    </SidebarContextProvider>
  );
};
