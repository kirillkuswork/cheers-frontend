/* eslint-disable import/no-cycle */
import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { IconButton } from '@/shareds';
import { ArrowLeft, CrossIcn } from '@/assets/icons';
import styles from './styles.module.scss';
import { Portal } from '../../utils/components';
import { containerAnimation, overlayAnimation } from './consts';

interface IProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
  onClose?: () => void;
  onBack?: () => void;
  canClose?: boolean;
  canBack?: boolean;
}

function ModalScrollWrapper({
  children,
  isVisible = false,
  className,
  onClose,
  onBack,
  canClose,
  canBack,
}: IProps) {
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
              {canBack && (
              <IconButton
                className={styles.backButton}
                onClick={onBack}
                icon={<ArrowLeft />}
                variant="secondary"
              />
              )}
              {canClose && (
                <IconButton
                  className={styles.closeButton}
                  onClick={onClose}
                  icon={<CrossIcn />}
                  variant="secondary"
                />
              )}
              <div className={styles.childrenWrapper}>
                <div className={styles.children}>{children}</div>
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
}

export default ModalScrollWrapper;
