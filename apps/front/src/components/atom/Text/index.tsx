import clsx from 'clsx';
import React from 'react';

import { useSprinkleProps } from '@/hooks/useSprinkleProps';

import { TextSprinkles, textSprinkles, textStyles } from './text.css';

type TextProps = React.HTMLAttributes<HTMLSpanElement> & TextSprinkles;

export const Text: React.FC<TextProps> = ({ className, ...rest }) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, textSprinkles.properties);

  return (
    <span className={clsx(textSprinkles(sprinkleProps), textStyles, className)} {...nativeProps} />
  );
};
