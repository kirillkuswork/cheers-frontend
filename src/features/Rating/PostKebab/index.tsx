/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useRef, useState } from 'react';
import { Edit, Kebab, Trash } from '@/assets/icons';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import { RatingModal } from '@/entities/Rating';
import { IconButton } from '@/shareds/ui';
import styles from './styles.module.scss';

interface IProps {
  myReviewId: number,
  onDelete: (value: boolean) => void,
}
export const PostKebab = ({ onDelete, myReviewId }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(dropdownRef, handleClose, isOpen);

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      <IconButton
        icon={<Kebab />}
        className={styles.iconButton}
        onClick={toggleDropdown}
      />

      {isOpen && (
        <div className={styles.popup}>
          <div
            className={styles.listItem}
            onClick={handleModalOpen}
          >
            <span className={styles.icon}><Edit /></span>
            <span>Изменить оценку</span>
          </div>
          <div className={styles.listItem} onClick={() => onDelete(true)}>
            <span className={styles.icon}><Trash /></span>
            <span>Удалить оценку</span>
          </div>
        </div>
      )}

      {isModalOpen && (
        <RatingModal
          myReviewId={myReviewId}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default PostKebab;
