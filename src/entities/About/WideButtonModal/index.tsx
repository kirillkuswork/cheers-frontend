import React, { useState } from 'react';
import { WideButton } from '@/shareds/ui';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { WideButtonProps } from './types';

function WideButtonModal(props: WideButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOnLink = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    setIsOpen(true);
  };
  return (
    <>
      <ModalWrapper isVisible={isOpen}>
        <div>Вы уверены что хотите перейти в приложение?</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
          <WideButton disabled text="Не переходить" onClick={() => setIsOpen(false)} />
          <WideButton {...props} text="Перейти" />
        </div>
      </ModalWrapper>
      <WideButton {...props} onClick={handleClickOnLink} />
    </>
  );
}

export default WideButtonModal;
