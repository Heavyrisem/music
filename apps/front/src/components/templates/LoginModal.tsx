import Image from 'next/image';
import React from 'react';
import tw from 'twin.macro';

import { Button } from '../atoms/Button';
import { Modal } from '../organisms/Modal';
import { ModalRootProps } from '../organisms/Modal/components/Modal';

interface LoginModalProps extends ModalRootProps {
  onLoginClick?: (type: 'google') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ ...rest }) => {
  return (
    <Modal closeOnBackdropClick={true} {...rest}>
      <div css={[tw`flex flex-col gap-4`]}>
        <div css={[tw`text-lg font-bold`, tw`flex justify-center items-center`]}>로그인</div>
        <div css={[tw`w-full h-[1px]`, tw`bg-gray-200 bg-opacity-10`]} />
        <Button bgStyle css={[tw`flex gap-2 items-center`, tw`py-2`]}>
          <Image src={'/google.svg'} width={24} height={24} alt="" />
          Continue with Google
        </Button>
      </div>
    </Modal>
  );
};
