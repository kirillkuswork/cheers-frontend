import { Button, IconButton } from '@/shareds/ui';
import { CrossIcn } from '@/shareds/assets/icons';
import styles from './styles.module.scss';

export const SuccessForm = ({ onClose }: { onClose?: () => void }) => (
  <div className={styles.wrapper}>
    <IconButton
      icon={<CrossIcn />}
      className={styles.closeBtn}
      onClick={onClose}
    />
    <div className={styles.title}>
      Спасибо за заявку!
    </div>
    <div className={styles.subtitle}>
      Мы с вами свяжемяся в ближайшее время.
    </div>
    <Button
      label="В каталог"
      onClick={onClose}
      className={styles.button}
      size="large"
    />
  </div>
);
