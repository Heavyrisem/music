import clsx from 'clsx';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

import { triggerIconStyle, triggerStyle } from '../accordian.css';
import { useAccordianContext } from '../context/accordian';
import { useAccordianItemContext } from '../context/item';

export type TriggerProps = React.HTMLAttributes<HTMLDivElement> & {};

export const Trigger: React.FC<TriggerProps> = ({ className, children, ...props }) => {
  const { opened, handleOpen } = useAccordianContext();
  const { id } = useAccordianItemContext();

  return (
    <div
      onClick={() => handleOpen(id)}
      className={clsx(triggerStyle, className)}
      data-open={opened === id}
      {...props}
    >
      {children}
      <HiChevronDown className={triggerIconStyle} />
    </div>
  );
};
