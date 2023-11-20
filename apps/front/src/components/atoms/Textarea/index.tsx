import React, { useCallback, useRef, useState } from 'react';
import tw from 'twin.macro';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ resize, className, ...props }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
        tw`flex items-center`,
        tw`bg-gray-200 bg-opacity-10`,
        tw`border-2 rounded-md border-gray-200 border-opacity-20`,
        tw`transition-all`,
        focused && tw`border-2 border-gray-200 border-opacity-40`,
      ]}
      className={className}
    >
      <textarea
        onChange={(e) => e.target.value}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        css={[
          tw`w-full h-full`,
          tw`bg-white bg-opacity-0`,
          tw`outline-none`,
          tw`placeholder:(text-gray-200 text-opacity-20)`,
          !resize && tw`resize-none`,
          // tw`bg-gray-200 bg-opacity-10`,
          // tw`border-2 rounded-md border-gray-200 border-opacity-20`,
          // tw`outline-none focus:(border-2 border-gray-200 border-opacity-40)`,
        ]}
        {...props}
      />
    </div>
  );
};
