import clsx from 'clsx';

import { contentStyle } from '../accordian.css';
import { useAccordianContext } from '../context/accordian';
import { useAccordianItemContext } from '../context/item';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Content: React.FC<ContentProps> = ({ className, children, ...props }) => {
  const { opened } = useAccordianContext();
  const { id } = useAccordianItemContext();

  return (
    <div className={clsx(contentStyle, className)} data-open={opened === id} {...props}>
      {children}
    </div>
  );
};
