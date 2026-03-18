/* eslint-disable import/no-cycle */
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { IconButton } from '@/shareds';
import { CrossIcn } from '@/assets/icons';
import styles from './styles.module.scss';
import { Portal } from '../../utils/components';

interface IProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
  onClose?: () => void;
  canClose?: boolean;
}

const overlayAnimation = {
  hidden: {
    opacity: 0.05,
  },
  visible: {
    opacity: 1,
  },
};

const containerAnimation = {
  hidden: {
    transform: 'translateY(20%)',
    opacity: 0.05,
  },
  visible: {
    transform: 'translateY(0%)',
    opacity: 1,
  },
};

function ModalWrapper({
  children,
  isVisible = false,
  className,
  onClose,
  canClose,
}: IProps) {
  // Решить проблему со съезжанием модалки выше границы экрана если высота модалки больше высоты экрана

  // const [isOverflow, setIsOverflow] = useState(false);

  // useLayoutEffect(() => {
  //   const handleResize = () => {
  //     const modalElement = document.getElementById('modal-container');
  //     if (modalElement) {
  //       const modalHeight = modalElement.offsetHeight;
  //       const screenHeight = window.innerHeight;
  //       set(modalHeight > screenHeight);
  //     }
  //   };

  //   if (isVisible) {
  //     handleResize();
  //     window.addEventListener('resize', handleResize);
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isVisible, ]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Portal isModalOpen={isVisible}>
          <motion.div
            className={styles.overlay}
            variants={overlayAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, type: 'tween' }}
            onClick={canClose ? () => {} : onClose}
          >
            <motion.div
              id="modal-container"
              className={clsx(styles.container, className)}
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.3, type: 'tween' }}
            >
              {canClose && (
              <IconButton
                className={styles.closeButton}
                onClick={onClose}
                icon={<CrossIcn />}
                variant="secondary"
              />
              )}
              {children}
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
}

export default ModalWrapper;
