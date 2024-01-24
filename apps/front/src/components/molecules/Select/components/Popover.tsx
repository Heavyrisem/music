import clsx from 'clsx';

import { Popover as PopoverComponent } from '@/components/Popover';
import { PopoverContentProps } from '@/components/Popover/components/Content';

import { selectPopoverStyles } from '../select.css';

interface SelectPopoverProps extends PopoverContentProps {}

export const Popover: React.FC<SelectPopoverProps> = ({ className, ...rest }) => {
  return <PopoverComponent.Content className={clsx(selectPopoverStyles, className)} {...rest} />;
};
