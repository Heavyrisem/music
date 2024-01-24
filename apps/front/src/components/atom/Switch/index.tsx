import { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';
import { useCallback } from 'react';

import { useControlled } from '@/hooks/useControlled';

import { switchIconStyle, switchVariants } from './switch.css';

type SwitchProps = React.HTMLAttributes<HTMLDivElement> &
  RecipeVariants<typeof switchVariants> & {
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
  };

export const Switch: React.FC<SwitchProps> = ({
  active: activeProp,
  size = 'md',
  defaultValue = false,
  className,
  onChange,
  ...rest
}) => {
  const [active, setActive] = useControlled(defaultValue, activeProp);

  const handleClickSwitch = useCallback(() => {
    setActive(!active);
    onChange?.(!active);
  }, [active, onChange, setActive]);

  return (
    <div
      className={clsx(switchVariants({ active, size }), className)}
      onClick={handleClickSwitch}
      {...rest}
    >
      <span className={switchIconStyle} />
    </div>
  );
};
