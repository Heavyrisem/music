import React from 'react';
import tw from 'twin.macro';

interface OptionIconProps extends React.SVGProps<SVGSVGElement> {}

export const OptionIcon: React.FC<OptionIconProps> = ({
  fill = 'white',
  stroke = 'white',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      fill={fill}
      stroke={stroke}
      {...props}
    >
      <circle cx="6" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="18" cy="12" r="1" />
    </svg>
  );
};
