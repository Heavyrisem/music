import clsx from 'clsx';
import { useMemo } from 'react';

import { useSprinkleProps } from '@/hooks/useSprinkleProps';

import { BoxSprinkles, boxSprinkles } from './box.css';

type BoxProps = BoxSprinkles & React.HTMLAttributes<HTMLDivElement>;

export const Box: React.FC<BoxProps> = ({ className, ...rest }) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, boxSprinkles.properties);

  return <div className={clsx(boxSprinkles(sprinkleProps), className)} {...nativeProps} />;
};
