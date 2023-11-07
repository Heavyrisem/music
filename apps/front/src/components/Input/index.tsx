import React from 'react';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return <input {...props} />;
};
