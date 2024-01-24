import { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';
import { useMemo } from 'react';

import { buttonVariants } from './button.css';

type ButtonProps = RecipeVariants<typeof buttonVariants> & React.HTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className, variant, disabled, ...rest }) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, disabled }), className)}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    />
  );
};
