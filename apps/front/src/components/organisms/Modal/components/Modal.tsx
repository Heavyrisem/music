import { useCallback } from 'react';
import tw from 'twin.macro';

import { ReactPortal, ReactPortalProps } from '@/components/atoms/Portal';

import { ModalContextProvider, ModalContextProviderProps } from '../context';
import { useModalContext } from '../hooks/useModalContext';

export interface ModalPortalProps extends ReactPortalProps {}

export const Modal: React.FC<ModalPortalProps> = ({ children, ...rest }) => {
  const { open, closeOnBackdropClick, closeModal } = useModalContext();

  const handleClickBackdrop = useCallback(() => {
    if (closeOnBackdropClick) closeModal();
  }, [closeModal, closeOnBackdropClick]);

  return (
    <ReactPortal {...rest}>
      <div
        css={[
          tw`absolute top-0 w-full h-full`,
          tw`flex justify-center items-center`,
          tw`invisible transition-opacity opacity-0`,
          open && tw`visible opacity-100`,
        ]}
      >
        <div
          css={[tw`absolute z-30 w-full h-full`, tw`bg-black bg-opacity-50`]}
          onClick={handleClickBackdrop}
        />
        <div
          css={[
            tw`z-50`,
            tw`p-4`,
            tw`inline-block min-w-[10rem]`,
            tw`backdrop-blur bg-gray-200 bg-opacity-20`,
            tw`rounded-lg`,
            tw`text-gray-200 text-opacity-70`,
          ]}
        >
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};

export interface ModalRootProps extends React.PropsWithChildren, ModalContextProviderProps {}

export const ModalComponent: React.FC<ModalRootProps> = ({ children, ...rest }) => {
  return (
    <ModalContextProvider {...rest}>
      <Modal wrapperId="music-modal-portal">{children}</Modal>
    </ModalContextProvider>
  );
};
