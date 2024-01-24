import { AccordianItemContextProvider, AccordianItemContextProviderProps } from '../context/item';

interface ItemProps extends AccordianItemContextProviderProps {}

export const Item: React.FC<ItemProps> = ({ id, children }) => {
  return <AccordianItemContextProvider id={id}>{children}</AccordianItemContextProvider>;
};
