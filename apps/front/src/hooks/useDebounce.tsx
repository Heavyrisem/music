import { useCallback, useEffect, useRef, useState } from 'react';

interface debounceProps<T> {
  value: T;
  delay: number;
}

function useDebounce<T>({ value, delay }: debounceProps<T>): T {
  const prevRef = useRef<T>(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  const updateFn = useCallback(() => {
    console.log(prevRef.current, value);
    if (prevRef.current !== value) {
      setDebouncedValue(value);
    }
    prevRef.current = value;
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(updateFn, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, updateFn]);

  return debouncedValue;
}

export default useDebounce;
