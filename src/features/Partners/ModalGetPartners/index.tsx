/* eslint-disable no-irregular-whitespace */
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import styles from './styles.module.scss';
import OutroForm from '../OutroForm';

function ModalGetPartners({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <ModalWrapper isVisible={isOpen} className={styles.wrapper} onClose={onClose}>
      <OutroForm onSubmit={onClose} />
    </ModalWrapper>
  );
}

export default ModalGetPartners;
