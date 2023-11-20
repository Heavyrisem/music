import React, { useCallback, useRef, useState } from 'react';
import tw from 'twin.macro';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState<boolean>(false);

  const handleClickContainer = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    e.stopPropagation();
    e.preventDefault();

    inputRef.current?.focus();
  }, []);

  return (
    <div
      onClickCapture={handleClickContainer}
      css={[
        tw`flex items-center px-2`,
        tw`bg-gray-200 bg-opacity-10`,
        tw`border-2 rounded-md border-gray-200 border-opacity-20`,
        tw`transition-all`,
        focused && tw`border-2 border-gray-200 border-opacity-40`,
      ]}
    >
      {icon && <div css={[tw`pl-1`]}>{icon}</div>}
      <input
        onChange={(e) => e.target.value}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        css={[
          tw`bg-white bg-opacity-0`,
          tw`outline-none`,
          tw`placeholder:(text-gray-200 text-opacity-20)`,
          // tw`bg-gray-200 bg-opacity-10`,
          // tw`border-2 rounded-md border-gray-200 border-opacity-20`,
          // tw`outline-none focus:(border-2 border-gray-200 border-opacity-40)`,
        ]}
        {...props}
      />
    </div>
  );
};
