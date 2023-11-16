import { debounce } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import tw, { css } from 'twin.macro';

interface SliderInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  showCursor?: boolean;
  min?: number;
  max?: number;
  value?: number;
  cursorType?: 'bar' | 'circle';
  onChange?: (value: number) => void;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  min = 0,
  max = 100,
  step = 1,
  showCursor,
  value,
  cursorType = 'bar',
  onChange,
  ...rest
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const [actualValue, setActualValue] = useState(value ?? 0);

  // TODO: width animation?
  const widthStyle = useMemo(() => {
    const v = (actualValue / max) * 100;
    const width = `${v > 100 ? 100 : v}%`;
    return width;
  }, [actualValue, max]);

  const InputRangeStyle = useMemo(() => {
    const shouldShowCursor = showCursor !== undefined ? showCursor : hover;

    return [
      css`
        ${tw`appearance-none w-full rounded-full outline-none border-none opacity-95 relative h-1`}
        ${tw`bg-gray-200 bg-opacity-20`}

      &::before {
          ${tw`h-1 rounded-full float-left absolute bg-white min-w-[.8%]`}
          z-index: -1;
          content: '';
          width: var(--progress-value);
        }

        &::-webkit-slider-runnable-track {
          ${tw`appearance-none w-full rounded-full`}
        }

        &::-webkit-slider-thumb {
          ${tw`appearance-none`}
          box-sizing: border-box;
          opacity: ${shouldShowCursor ? 1 : 0};
          ${cursorType === 'bar' &&
          tw`h-3.5 w-1.5 rounded-full duration-200 bg-white border-solid border border-black`}
          ${cursorType === 'circle' &&
          tw`h-3.5 w-3.5 rounded-full duration-200 bg-white border-solid border border-black`}
        }
      `,
    ];
  }, [cursorType, hover, showCursor]);

  const handleOnChange = (onChnageFn: SliderInputProps['onChange'], value: number) => {
    onChnageFn?.(value);
  };

  const debouncedOnChange = useMemo(() => debounce(handleOnChange, 100), []);

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setActualValue(value);
      debouncedOnChange(onChange, value);
    },
    [debouncedOnChange, onChange],
  );

  useEffect(() => {
    if (value !== undefined) setActualValue(value);
  }, [value]);

  return (
    <input
      type="range"
      style={{ '--progress-value': widthStyle }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      value={actualValue}
      css={[InputRangeStyle]}
      min={min}
      max={max}
      step={step}
      onChange={handleValueChange}
      {...rest}
    />
  );
};
