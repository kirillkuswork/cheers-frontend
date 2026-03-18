/* eslint-disable no-irregular-whitespace */
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useCallback } from 'react';
import { partnersActions } from '@/redux/actions/partnersActions';
import { useActions } from '@/shareds/hooks/useActions';
import OutroForm from './OutroForm';
import styles from './styles.module.scss';
import { SuccessForm } from './SuccessForm';

export const ModalPartners = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { isPartnersSubmitModalOpen } = useSelector(selectors.partnersSelector);
  const { setIsPartnersSubmitModalOpen } = useActions(partnersActions);
  const handleClose = useCallback(() => setIsPartnersSubmitModalOpen(false), [setIsPartnersSubmitModalOpen]);

  return (
    <>
      <ModalWrapper
        isVisible={isOpen}
        className={styles.wrapper}
        onClose={onClose}
      >
        <OutroForm onClose={onClose} />
      </ModalWrapper>

      <ModalWrapper
        isVisible={isPartnersSubmitModalOpen}
        className={styles.wrapper}
        onClose={handleClose}
      >
        <SuccessForm onClose={handleClose} />
      </ModalWrapper>
    </>
  );
};
