import React, { useCallback } from 'react';

import { Button, ButtonProps } from '@/components/atoms/Button';

import { useModalContext } from '../hooks/useModalContext';

export interface CloseButtonProps extends ButtonProps {}

export const CloseButton = ({ onClick, ...props }: CloseButtonProps) => {
  const { closeModal } = useModalContext();

  const handleClickButton = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      // close button에 커스텀 이벤트 리스너 함수가 있으면 기존 로직을 사용하지 않음
      if (onClick === undefined) closeModal();
      onClick?.(e);
    },
    [onClick, closeModal],
  );

  return <Button onClick={handleClickButton} {...props} />;
};
