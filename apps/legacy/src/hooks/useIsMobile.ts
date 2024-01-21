import { useWindowSize } from 'usehooks-ts';

export const useIsMobile = () => {
  const { width } = useWindowSize();

  return { isMobile: width <= 1024 };
};
