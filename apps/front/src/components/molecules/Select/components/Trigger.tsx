import { Popover } from '@/components/Popover';
import { PopoverTriggerProps } from '@/components/Popover/components/Trigger';

export interface SelectTriggerProps extends PopoverTriggerProps {}

export const Trigger: React.FC<SelectTriggerProps> = (props) => {
  return <Popover.Trigger {...props} />;
};
