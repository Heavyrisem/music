import { AccordianContextProvider, AccordianContextProviderProps } from '../context/accordian';

interface Root extends AccordianContextProviderProps {}

export const Root: React.FC<AccordianContextProviderProps> = (props) => {
  return <AccordianContextProvider {...props} />;
};
